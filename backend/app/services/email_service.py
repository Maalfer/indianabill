"""
Servicio de email — STUB para futura integración.

CONFIGURACIÓN PENDIENTE — elige una opción en .env:

Opción 1 — SendGrid (recomendado):
  pip install sendgrid
  SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
  EMAIL_FROM=hola@indianabillgijon.es
  EMAIL_FROM_NAME=Indiana Bill Gijón

Opción 2 — SMTP (Gmail, Brevo, etc.):
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=hola@indianabillgijon.es
  SMTP_PASS=tu_contraseña_o_app_password

AUTOMATIZACIÓN DE CUMPLEAÑOS:
  Para activar los recordatorios automáticos:
  1. Implementa send_email() con tu proveedor elegido
  2. Configura un cron job (crontab o APScheduler) que llame a
     job_birthday_reminders() cada día a las 10:00
  3. O usa una herramienta externa como Make.com / n8n
     apuntando a POST /api/automation/jobs/birthday-check
"""

import os
import json
import logging
from typing import Optional

logger = logging.getLogger(__name__)


async def send_email(
    to_email: str,
    to_name: str,
    subject: str,
    html_body: str,
    text_body: Optional[str] = None,
) -> bool:
    """
    Envía un email. Devuelve True si se envió correctamente.

    TODO: Descomentar una de las implementaciones de abajo
    y borrar el raise NotImplementedError.
    """
    raise NotImplementedError(
        "Configura SENDGRID_API_KEY o credenciales SMTP en .env "
        "y descomenta la implementación correspondiente en email_service.py"
    )

    # ── IMPLEMENTACIÓN SENDGRID ────────────────────────────────────────────
    # from sendgrid import SendGridAPIClient
    # from sendgrid.helpers.mail import Mail
    # try:
    #     sg = SendGridAPIClient(os.environ["SENDGRID_API_KEY"])
    #     message = Mail(
    #         from_email=(os.environ.get("EMAIL_FROM"), os.environ.get("EMAIL_FROM_NAME", "Indiana Bill Gijón")),
    #         to_emails=[(to_email, to_name)],
    #         subject=subject,
    #         html_content=html_body,
    #         plain_text_content=text_body or "",
    #     )
    #     sg.send(message)
    #     return True
    # except Exception as e:
    #     logger.error(f"SendGrid error: {e}")
    #     return False

    # ── IMPLEMENTACIÓN SMTP ────────────────────────────────────────────────
    # import smtplib
    # from email.mime.multipart import MIMEMultipart
    # from email.mime.text import MIMEText
    # try:
    #     msg = MIMEMultipart("alternative")
    #     msg["Subject"] = subject
    #     msg["From"] = f"{os.environ.get('EMAIL_FROM_NAME', 'Indiana Bill')} <{os.environ['SMTP_USER']}>"
    #     msg["To"] = f"{to_name} <{to_email}>"
    #     if text_body:
    #         msg.attach(MIMEText(text_body, "plain"))
    #     msg.attach(MIMEText(html_body, "html"))
    #     with smtplib.SMTP(os.environ["SMTP_HOST"], int(os.environ.get("SMTP_PORT", 587))) as server:
    #         server.starttls()
    #         server.login(os.environ["SMTP_USER"], os.environ["SMTP_PASS"])
    #         server.sendmail(os.environ["SMTP_USER"], to_email, msg.as_string())
    #     return True
    # except Exception as e:
    #     logger.error(f"SMTP error: {e}")
    #     return False


def build_birthday_reminder_email(nombre_padre: str, nombre_nino: str, dias_restantes: int) -> dict:
    """Genera el asunto y cuerpo HTML para el recordatorio de cumpleaños."""
    subject = f"¡El cumpleaños de {nombre_nino} se acerca! 🎂 Reserva en Indiana Bill"
    html = f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #22c55e; padding: 24px; text-align: center;">
        <h1 style="color: white; margin: 0;">🎉 Indiana Bill Gijón</h1>
      </div>
      <div style="padding: 32px 24px;">
        <p style="font-size: 18px;">Hola <strong>{nombre_padre}</strong>,</p>
        <p>El cumpleaños de <strong>{nombre_nino}</strong> es en
           <strong>{dias_restantes} días</strong>. ¿Ya tienes el plan?</p>
        <p>En Indiana Bill Gijón te lo organizamos todo: merienda, tarta, monitores
           y más de 4 horas de juego ilimitado.</p>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://indianabillgijon.es/cumpleanos"
             style="background: #22c55e; color: white; padding: 14px 28px;
                    border-radius: 50px; text-decoration: none; font-weight: bold;">
            Ver disponibilidad y precios
          </a>
        </div>
        <p style="color: #888; font-size: 14px;">
          O llámanos al <strong>684 657 760</strong> y te ayudamos a elegir el mejor paquete.
        </p>
      </div>
      <div style="background: #f5f5f5; padding: 16px 24px; text-align: center; font-size: 12px; color: #aaa;">
        Indiana Bill Gijón · Parque infantil Gijón<br/>
        <a href="https://indianabillgijon.es" style="color: #22c55e;">indianabillgijon.es</a>
      </div>
    </div>
    """
    return {"subject": subject, "html": html}


async def job_birthday_reminders(db) -> dict:
    """
    Job que busca leads con fecha_nacimiento_nino ~30 días antes del cumpleaños
    y crea EmailJob pendientes para enviar recordatorios.

    TODO: Descomentar y adaptar cuando send_email() esté implementado.
    Llamar diariamente con un cron o desde el endpoint /api/automation/jobs/birthday-check.
    """
    # from datetime import date, timedelta
    # from ..models.lead import Lead
    # from ..models.email_job import EmailJob, EmailJobTipo, EmailJobEstado
    # import json
    #
    # today = date.today()
    # target_date = today + timedelta(days=30)
    # leads = db.query(Lead).filter(
    #     Lead.email.isnot(None),
    #     Lead.fecha_nacimiento_nino.isnot(None),
    # ).all()
    #
    # created = 0
    # for lead in leads:
    #     try:
    #         birth = date.fromisoformat(lead.fecha_nacimiento_nino)
    #         next_birthday = birth.replace(year=today.year)
    #         if next_birthday < today:
    #             next_birthday = next_birthday.replace(year=today.year + 1)
    #         if next_birthday == target_date:
    #             job = EmailJob(
    #                 tipo=EmailJobTipo.BIRTHDAY_REMINDER_30,
    #                 destinatario_email=lead.email,
    #                 destinatario_nombre=lead.nombre,
    #                 datos_json=json.dumps({"nombre_nino": lead.nombre_nino, "dias": 30}),
    #                 programado_para=datetime.combine(today, time(10, 0)),
    #                 lead_id=lead.id,
    #             )
    #             db.add(job)
    #             created += 1
    #     except Exception:
    #         continue
    # db.commit()
    # return {"jobs_created": created}

    return {"status": "stub", "message": "Configura el servicio de email primero"}
