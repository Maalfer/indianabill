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
from ..routers.auth import get_current_user
from ..models.user import User

router = APIRouter(prefix="/api/automation", tags=["automation"])
logger = logging.getLogger(__name__)


@router.get("/health")
def automation_health():
    """Devuelve qué servicios de automatización están configurados."""
    return {
        "email": {
            "configured": bool(
                os.environ.get("SENDGRID_API_KEY") or
                os.environ.get("SMTP_HOST")
            ),
            "provider": (
                "sendgrid" if os.environ.get("SENDGRID_API_KEY")
                else "smtp" if os.environ.get("SMTP_HOST")
                else None
            ),
        },
        "whatsapp": {
            "configured": bool(
                os.environ.get("TWILIO_ACCOUNT_SID") or
                os.environ.get("WA_ACCESS_TOKEN")
            ),
            "provider": (
                "twilio" if os.environ.get("TWILIO_ACCOUNT_SID")
                else "meta" if os.environ.get("WA_ACCESS_TOKEN")
                else None
            ),
        },
        "stripe": {
            "configured": bool(os.environ.get("STRIPE_SECRET_KEY")),
        },
    }


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


@router.post("/jobs/birthday-check")
async def trigger_birthday_check(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Dispara manualmente el job de recordatorios de cumpleaños.
    Solo accesible para admins. Normalmente lo llamaría un cron.

    TODO: Activar cuando email_service.py esté configurado.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Solo administradores")

    from ..services.email_service import job_birthday_reminders
    result = await job_birthday_reminders(db)
    return result


@router.post("/jobs/send-pending")
async def send_pending_emails(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Envía los EmailJob pendientes. Solo admins.

    TODO: Implementar cuando email_service.py esté configurado.
    """
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Solo administradores")

    # from ..models.email_job import EmailJob, EmailJobEstado
    # from ..services.email_service import send_email, build_birthday_reminder_email
    # import json
    # from datetime import datetime, timezone
    #
    # pending = db.query(EmailJob).filter(EmailJob.estado == EmailJobEstado.PENDIENTE).all()
    # sent = 0
    # for job in pending:
    #     try:
    #         datos = json.loads(job.datos_json or "{}")
    #         email_data = build_birthday_reminder_email(
    #             job.destinatario_nombre, datos.get("nombre_nino", ""), datos.get("dias", 30)
    #         )
    #         ok = await send_email(
    #             job.destinatario_email, job.destinatario_nombre,
    #             email_data["subject"], email_data["html"]
    #         )
    #         job.estado = EmailJobEstado.ENVIADO if ok else EmailJobEstado.FALLIDO
    #         job.enviado_at = datetime.now(timezone.utc)
    #         sent += 1 if ok else 0
    #     except Exception as e:
    #         logger.error(f"Error enviando job {job.id}: {e}")
    #         job.estado = EmailJobEstado.FALLIDO
    # db.commit()
    # return {"sent": sent, "total": len(pending)}

    return {"status": "stub", "message": "Configura el servicio de email primero"}
