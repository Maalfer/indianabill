"""
Automation router — webhooks y jobs de automatización.

Endpoints activos:
  GET  /api/automation/health  — comprueba qué servicios están configurados

Endpoints STUB (requieren configuración externa):
  POST /api/automation/webhook/whatsapp  — webhook de WhatsApp Business API
  POST /api/automation/jobs/birthday-check — dispara el job de recordatorios
  POST /api/automation/jobs/send-pending  — envía emails pendientes en EmailJob
"""

import os
import logging
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from ..database import get_db
from ..config import settings
from ..routers.admin import get_admin_user
from ..routers.auth import get_current_user
from ..models.user import User
from ..services import email_service

router = APIRouter(prefix="/api/automation", tags=["automation"])
logger = logging.getLogger(__name__)


@router.get("/health")
def automation_health():
    """Devuelve qué servicios de automatización están configurados."""
    return {
        "email": {
            "configured": email_service.email_configured(),
            "provider": "smtp" if email_service.email_configured() else None,
        },
        "stripe": {
            "configured": bool(settings.stripe_secret_key),
        },
        "automation": {
            "configured": bool(settings.automation_token),
        },
    }


@router.post("/cron/reminders")
def cron_reminders(request: Request, db: Session = Depends(get_db)):
    """Ejecuta los recordatorios de fianza. Lo llama el cron con X-Automation-Token."""
    token = request.headers.get("x-automation-token", "")
    if not settings.automation_token or token != settings.automation_token:
        raise HTTPException(status_code=403, detail="Token de automatización inválido")
    return email_service.run_reminders(db)


@router.post("/reminders/run")
def reminders_run(admin_user: User = Depends(get_admin_user), db: Session = Depends(get_db)):
    """Dispara los recordatorios manualmente desde el panel. Solo admin."""
    return email_service.run_reminders(db)


@router.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):
    """
    Webhook de WhatsApp Business API (Meta Cloud API).

    Meta envía un GET con hub.challenge para verificar el endpoint.
    Los mensajes entrantes llegan como POST.

    TODO: Implementar lógica de respuesta automática cuando el servicio esté configurado.
    """
    # Verificación del webhook (GET con hub.challenge)
    params = dict(request.query_params)
    if "hub.challenge" in params:
        verify_token = os.environ.get("WA_VERIFY_TOKEN", "")
        if params.get("hub.verify_token") == verify_token:
            return int(params["hub.challenge"])
        raise HTTPException(status_code=403, detail="Token de verificación incorrecto")

    # Mensaje entrante (POST)
    try:
        body = await request.json()
        logger.info(f"WhatsApp webhook received: {body}")
        # TODO: Parsear el mensaje, identificar al lead, responder automáticamente
        # entry → changes → value → messages → [message]
    except Exception as e:
        logger.error(f"WhatsApp webhook error: {e}")

    return {"status": "ok"}


