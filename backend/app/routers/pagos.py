"""
Pagos router — enlaces de fianza con Stripe.

Endpoints:
  GET  /api/pagos/config            — ¿están los pagos online configurados?
  POST /api/pagos/fianza/{lead_id}  — genera un enlace de pago de fianza (admin)
  POST /api/pagos/webhook           — webhook de Stripe (confirma la reserva)

Mientras STRIPE_SECRET_KEY no esté en el .env, los endpoints de pago devuelven
503 con un mensaje claro y el panel ofrece el cobro presencial / por WhatsApp.
"""

import logging
from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Request, BackgroundTasks
from sqlalchemy.orm import Session

from ..database import get_db
from ..config import settings
from ..models.lead import Lead, LeadEstado
from ..models.user import User
from .admin import get_admin_user
from .auth import get_current_user
from ..services import stripe_service, email_service

router = APIRouter(prefix="/api/pagos", tags=["pagos"])
logger = logging.getLogger(__name__)


@router.get("/config")
def stripe_config():
    """Indica si los pagos online están configurados (para el panel)."""
    return {
        "configured": stripe_service.stripe_configured(),
        "publishable_key": settings.stripe_publishable_key or None,
    }


@router.post("/fianza/{lead_id}")
def crear_enlace_fianza(
    lead_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Genera un enlace de pago de fianza para una reserva. Solo recepción/admin."""
    if not stripe_service.stripe_configured():
        raise HTTPException(
            status_code=503,
            detail="Pagos online no configurados. Cobra la fianza en efectivo o pide la configuración de Stripe.",
        )

    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")

    importe = lead.fianza_importe or settings.fianza_amount_eur
    base = settings.public_base_url.rstrip("/")
    try:
        result = stripe_service.crear_link_fianza(
            lead_id=lead.id,
            nombre=lead.nombre,
            importe_eur=importe,
            success_url=f"{base}/?fianza=ok",
            cancel_url=f"{base}/?fianza=cancelada",
        )
    except Exception as e:
        logger.error("Error creando enlace de fianza: %s", e)
        raise HTTPException(status_code=502, detail="No se pudo crear el enlace de pago.")

    # Marca que la fianza se ha solicitado por enlace (método 'sms').
    if not lead.fianza_metodo:
        lead.fianza_metodo = "sms"
        db.commit()

    return {"url": result["url"], "importe": importe}


@router.post("/fianza-cliente/{lead_id}")
def crear_enlace_fianza_cliente(
    lead_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """El cliente paga la fianza de su propia reserva (vinculada por email)."""
    if not stripe_service.stripe_configured():
        raise HTTPException(status_code=503, detail="Pagos online no disponibles. Contacta con el local.")

    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Reserva no encontrada")
    if not lead.email or not current_user.email or lead.email.lower() != current_user.email.lower():
        raise HTTPException(status_code=403, detail="Esta reserva no es tuya")
    if lead.fianza_pagada:
        raise HTTPException(status_code=400, detail="La fianza ya está pagada")

    importe = lead.fianza_importe or settings.fianza_amount_eur
    base = settings.public_base_url.rstrip("/")
    try:
        result = stripe_service.crear_link_fianza(
            lead_id=lead.id,
            nombre=lead.nombre,
            importe_eur=importe,
            success_url=f"{base}/panel?fianza=ok",
            cancel_url=f"{base}/panel?fianza=cancelada",
        )
    except Exception as e:
        logger.error("Error creando enlace de fianza (cliente): %s", e)
        raise HTTPException(status_code=502, detail="No se pudo crear el enlace de pago.")
    return {"url": result["url"], "importe": importe}


@router.post("/webhook")
async def stripe_webhook(request: Request, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Webhook de Stripe. Al completarse el pago, confirma la reserva."""
    if not stripe_service.stripe_configured():
        raise HTTPException(status_code=503, detail="Stripe no configurado")

    payload = await request.body()
    signature = request.headers.get("stripe-signature", "")

    try:
        result = stripe_service.parse_webhook(payload, signature)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error("Stripe webhook error: %s", e)
        raise HTTPException(status_code=400, detail="Webhook inválido")

    if result.get("paid") and result.get("lead_id"):
        lead = db.query(Lead).filter(Lead.id == result["lead_id"]).first()
        if lead and not lead.fianza_pagada:
            lead.fianza_pagada = True
            lead.fianza_metodo = "sms"
            lead.fianza_fecha_pago = date.today().isoformat()
            if lead.estado != LeadEstado.CELEBRADO:
                lead.estado = LeadEstado.RESERVA_CONFIRMADA
            db.commit()
            db.refresh(lead)
            logger.info("Fianza pagada (Stripe) para lead %s", lead.id)
            try:
                data = email_service.build_business_fianza_paid_email(lead)
                background_tasks.add_task(email_service.notify_business, data["subject"], data["html"])
            except Exception:
                pass

    return {"received": True}
