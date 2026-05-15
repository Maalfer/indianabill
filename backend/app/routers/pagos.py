"""
Pagos router — integración con Stripe.

STUB: Requiere configurar STRIPE_SECRET_KEY en .env.
Ver instrucciones completas en app/services/stripe_service.py.

Endpoints:
  GET  /api/pagos/config        — devuelve la publishable key para el frontend
  POST /api/pagos/crear-sesion  — crea una Checkout Session de Stripe
  POST /api/pagos/webhook       — webhook de eventos de Stripe
"""

import os
import logging
from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/api/pagos", tags=["pagos"])
logger = logging.getLogger(__name__)


class CrearSesionRequest(BaseModel):
    paquete: str  # clave de PRECIOS_STRIPE en stripe_service.py
    num_ninos: int
    lead_id: Optional[int] = None
    success_url: Optional[str] = "https://indianabillgijon.es/reservas?pago=ok"
    cancel_url: Optional[str] = "https://indianabillgijon.es/cumpleanos"


@router.get("/config")
def stripe_config():
    """Devuelve la publishable key para inicializar Stripe.js en el frontend."""
    pk = os.environ.get("STRIPE_PUBLISHABLE_KEY")
    return {
        "configured": bool(pk),
        "publishable_key": pk,
    }


@router.post("/crear-sesion")
async def crear_sesion_checkout(body: CrearSesionRequest):
    """
    Crea una Checkout Session de Stripe y devuelve la URL de pago.

    TODO: Descomentar cuando STRIPE_SECRET_KEY esté configurado.
    """
    if not os.environ.get("STRIPE_SECRET_KEY"):
        raise HTTPException(
            status_code=503,
            detail="Pagos online no configurados aún. Llama al 684 657 760 o escríbenos por WhatsApp."
        )

    from ..services.stripe_service import crear_sesion_checkout, PRECIOS_STRIPE
    price_id = PRECIOS_STRIPE.get(body.paquete)
    if not price_id or "XXXX" in price_id:
        raise HTTPException(status_code=400, detail="Paquete no válido o precio no configurado")

    result = await crear_sesion_checkout(
        price_id=price_id,
        cantidad=body.num_ninos,
        lead_id=body.lead_id or 0,
        success_url=body.success_url,
        cancel_url=body.cancel_url,
    )
    return result


@router.post("/webhook")
async def stripe_webhook(request: Request):
    """
    Webhook de Stripe. Stripe llama aquí cuando ocurre un evento de pago.
    Configura la URL en Stripe Dashboard → Developers → Webhooks.

    TODO: Descomentar cuando STRIPE_SECRET_KEY y STRIPE_WEBHOOK_SECRET estén configurados.
    """
    if not os.environ.get("STRIPE_SECRET_KEY"):
        raise HTTPException(status_code=503, detail="Stripe no configurado")

    payload = await request.body()
    signature = request.headers.get("stripe-signature", "")

    from ..services.stripe_service import procesar_webhook
    try:
        result = await procesar_webhook(payload, signature)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Stripe webhook error: {e}")
        raise HTTPException(status_code=500, detail="Error procesando webhook")
