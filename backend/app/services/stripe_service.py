"""
Servicio de pagos Stripe — STUB.

CONFIGURACIÓN PENDIENTE:
  1. Crea una cuenta en https://stripe.com
  2. Obtén tus claves en Dashboard → Developers → API Keys
  3. Añade al .env:
     STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxx
     STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxx
     STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
  4. Instala el SDK: pip install stripe
  5. En el frontend, añade en index.html:
     <script src="https://js.stripe.com/v3/"></script>

FLUJO PLANIFICADO:
  1. Cliente elige paquete de cumpleaños en /reservas
  2. POST /api/pagos/crear-sesion → Stripe crea una Checkout Session
  3. Frontend redirige a stripe.checkout (hosted) o muestra el formulario embebido
  4. Stripe llama a POST /api/pagos/webhook cuando el pago completa
  5. El webhook actualiza el Lead a estado=RESERVA_CONFIRMADA
  6. Se envía email/WhatsApp de confirmación

MÉTODOS DE PAGO CONFIGURADOS EN STRIPE:
  - Tarjeta (visa/mastercard)
  - Bizum (disponible en Stripe para España)
"""

import os
import logging

logger = logging.getLogger(__name__)

PRECIOS_STRIPE = {
    # price_id de Stripe → descripción interna
    # TODO: Crear productos en el Dashboard de Stripe y pegar los price_id aquí
    "menu_indy_semana": "price_XXXXXXXXXXXX",
    "menu_indy_finde": "price_XXXXXXXXXXXX",
    "menu_super_indy_semana": "price_XXXXXXXXXXXX",
    "menu_super_indy_finde": "price_XXXXXXXXXXXX",
    "fianza_reserva": "price_XXXXXXXXXXXX",
}


async def crear_sesion_checkout(
    price_id: str,
    cantidad: int,
    lead_id: int,
    success_url: str,
    cancel_url: str,
) -> dict:
    """
    Crea una Checkout Session de Stripe.
    Devuelve {"url": "https://checkout.stripe.com/..."} para redirigir al cliente.

    TODO: Descomentar cuando STRIPE_SECRET_KEY esté configurado.
    """
    raise NotImplementedError("Configura STRIPE_SECRET_KEY en .env")

    # import stripe
    # stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
    # session = stripe.checkout.Session.create(
    #     payment_method_types=["card", "bizum"],
    #     line_items=[{"price": price_id, "quantity": cantidad}],
    #     mode="payment",
    #     success_url=success_url,
    #     cancel_url=cancel_url,
    #     metadata={"lead_id": str(lead_id)},
    # )
    # return {"url": session.url, "session_id": session.id}


async def procesar_webhook(payload: bytes, signature: str) -> dict:
    """
    Procesa el webhook de Stripe (eventos de pago completado, fallido, etc.)

    TODO: Descomentar y conectar con la lógica de leads cuando Stripe esté configurado.
    """
    raise NotImplementedError("Configura STRIPE_WEBHOOK_SECRET en .env")

    # import stripe
    # stripe.api_key = os.environ["STRIPE_SECRET_KEY"]
    # webhook_secret = os.environ["STRIPE_WEBHOOK_SECRET"]
    # try:
    #     event = stripe.Webhook.construct_event(payload, signature, webhook_secret)
    # except stripe.error.SignatureVerificationError:
    #     raise ValueError("Firma de webhook inválida")
    #
    # if event["type"] == "checkout.session.completed":
    #     session = event["data"]["object"]
    #     lead_id = int(session["metadata"].get("lead_id", 0))
    #     # Actualizar lead a RESERVA_CONFIRMADA
    #     # Enviar email/WhatsApp de confirmación
    #     pass
    #
    # return {"received": True, "type": event["type"]}
