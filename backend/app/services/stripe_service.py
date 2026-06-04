"""
Servicio de pagos Stripe — enlaces de fianza para reservas de cumpleaños.

CONFIGURACIÓN (cuando se quiera activar pagos online):
  1. Crear cuenta en https://stripe.com y activar Bizum/tarjeta para España.
  2. Dashboard → Developers → API keys. Añadir al .env del backend:
       STRIPE_SECRET_KEY=sk_live_xxx
       STRIPE_PUBLISHABLE_KEY=pk_live_xxx
  3. Dashboard → Developers → Webhooks → añadir endpoint:
       https://indianabill.duckdns.org/api/pagos/webhook
     Evento: checkout.session.completed. Copiar el signing secret al .env:
       STRIPE_WEBHOOK_SECRET=whsec_xxx
  4. Reiniciar el backend:  sudo systemctl restart indianabill.service

FLUJO:
  - Recepción pulsa «Generar enlace de fianza» en una reserva del panel.
  - Se crea una Checkout Session de Stripe por el importe de la fianza (20€),
    con metadata.lead_id, y se devuelve la URL para enviar al cliente por SMS/WhatsApp.
  - Cuando el cliente paga, Stripe llama al webhook → la reserva pasa a
    fianza pagada y estado «reserva_confirmada» automáticamente.
"""

import logging
from ..config import settings

logger = logging.getLogger(__name__)


def stripe_configured() -> bool:
    return bool(settings.stripe_secret_key)


def crear_link_fianza(
    lead_id: int,
    nombre: str,
    importe_eur: int,
    success_url: str,
    cancel_url: str,
) -> dict:
    """
    Crea una Checkout Session de Stripe para cobrar la fianza de una reserva.
    Usa price_data en línea (no hace falta crear productos en Stripe).
    Devuelve {"url": ..., "session_id": ...}.
    """
    if not stripe_configured():
        raise RuntimeError("Stripe no configurado")

    import stripe
    stripe.api_key = settings.stripe_secret_key

    def _line_items():
        return [{
            "price_data": {
                "currency": "eur",
                "product_data": {
                    "name": f"Fianza reserva Indiana Bill — {nombre}",
                },
                "unit_amount": int(importe_eur) * 100,
            },
            "quantity": 1,
        }]

    common = dict(
        mode="payment",
        line_items=_line_items(),
        success_url=success_url,
        cancel_url=cancel_url,
        metadata={"lead_id": str(lead_id), "tipo": "fianza"},
    )

    # Bizum solo está disponible en cuentas españolas; si Stripe lo rechaza,
    # se reintenta solo con tarjeta.
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card", "bizum"], **common
        )
    except Exception as e:
        logger.warning("Bizum no disponible, reintentando solo tarjeta: %s", e)
        session = stripe.checkout.Session.create(
            payment_method_types=["card"], **common
        )

    return {"url": session.url, "session_id": session.id}


def parse_webhook(payload: bytes, signature: str) -> dict:
    """
    Verifica la firma del webhook de Stripe y devuelve, para los eventos de pago
    completado, {"paid": True, "lead_id": int}. Para el resto, {"paid": False}.
    """
    if not stripe_configured():
        raise RuntimeError("Stripe no configurado")

    import stripe
    stripe.api_key = settings.stripe_secret_key

    if settings.stripe_webhook_secret:
        event = stripe.Webhook.construct_event(
            payload, signature, settings.stripe_webhook_secret
        )
    else:
        # Sin secreto de firma: parsear sin verificar (no recomendado en producción).
        import json
        event = json.loads(payload.decode("utf-8"))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        if session.get("payment_status") == "paid":
            meta = session.get("metadata") or {}
            try:
                lead_id = int(meta.get("lead_id", 0))
            except (TypeError, ValueError):
                lead_id = 0
            return {"paid": True, "lead_id": lead_id, "type": event["type"]}

    return {"paid": False, "type": event["type"]}
