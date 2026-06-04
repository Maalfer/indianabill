"""
Servicio de email (SMTP) y motor de recordatorios de fianza.

CONFIGURACIÓN — añadir al .env del backend (Gmail: usar contraseña de aplicación):
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=indianabillgijonasturias@gmail.com
    SMTP_PASS=xxxx xxxx xxxx xxxx        # App Password de Google (16 car.)
    EMAIL_FROM=indianabillgijonasturias@gmail.com
    EMAIL_FROM_NAME=Indiana Bill Gijón
    NOTIFY_EMAIL=indianabillgijonasturias@gmail.com
    AUTOMATION_TOKEN=<token-largo-aleatorio>   # para que el cron dispare recordatorios
Reiniciar:  sudo systemctl restart indianabill.service

Sin estas variables, send_email() devuelve False y los recordatorios se omiten
sin romper nada (el panel sigue funcionando con cobro en efectivo).
"""

import json
import logging
import smtplib
from datetime import date, datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from ..config import settings

logger = logging.getLogger(__name__)


def email_configured() -> bool:
    return bool(settings.smtp_host and settings.smtp_user and settings.smtp_pass)


def send_email(to_email: str, to_name: str, subject: str, html_body: str, text_body: str | None = None) -> bool:
    """Envía un email por SMTP. Devuelve True si se envió. No lanza excepciones."""
    if not email_configured():
        logger.info("Email no configurado; se omite envío a %s", to_email)
        return False
    if not to_email:
        return False

    from_addr = settings.email_from or settings.smtp_user
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"{settings.email_from_name} <{from_addr}>"
        msg["To"] = f"{to_name} <{to_email}>" if to_name else to_email
        msg.attach(MIMEText(text_body or "", "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        port = int(settings.smtp_port or 587)
        if port == 465:
            with smtplib.SMTP_SSL(settings.smtp_host, port, timeout=15) as server:
                server.login(settings.smtp_user, settings.smtp_pass)
                server.sendmail(from_addr, [to_email], msg.as_string())
        else:
            with smtplib.SMTP(settings.smtp_host, port, timeout=15) as server:
                server.starttls()
                server.login(settings.smtp_user, settings.smtp_pass)
                server.sendmail(from_addr, [to_email], msg.as_string())
        logger.info("Email enviado a %s (%s)", to_email, subject)
        return True
    except Exception as e:
        logger.error("Error SMTP enviando a %s: %s", to_email, e)
        return False


def notify_business(subject: str, html: str) -> bool:
    """Envía una notificación interna al email del negocio."""
    return send_email(settings.notify_email, "Indiana Bill", subject, html)


# ── PLANTILLAS ────────────────────────────────────────────────────────────────

def _wrap(inner: str) -> str:
    return f"""
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border:1px solid #eee; border-radius:12px; overflow:hidden;">
      <div style="background:#22c55e; padding:20px; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:20px;">🎉 Indiana Bill Gijón</h1>
      </div>
      <div style="padding:28px 24px; color:#222;">{inner}</div>
      <div style="background:#f5f5f5; padding:14px 24px; text-align:center; font-size:12px; color:#999;">
        Indiana Bill Gijón · C/ Espronceda 17 · 684 657 760
      </div>
    </div>"""


def build_fianza_reminder_email(nombre: str, importe: int, dias: int, link: str | None = None) -> dict:
    cuando = "hoy" if dias == 0 else (f"en {dias} día" if dias == 1 else f"en {dias} días")
    boton = (
        f'<div style="text-align:center; margin:28px 0;">'
        f'<a href="{link}" style="background:#22c55e; color:#fff; padding:14px 28px; border-radius:50px; text-decoration:none; font-weight:bold;">Pagar fianza ({importe}€)</a></div>'
        if link else ""
    )
    inner = (
        f'<p style="font-size:17px;">Hola <strong>{nombre}</strong>,</p>'
        f'<p>El cumpleaños es <strong>{cuando}</strong> y aún nos falta recibir la <strong>fianza de {importe}€</strong> para dejar la reserva confirmada.</p>'
        f'{boton}'
        f'<p style="color:#666; font-size:14px;">También puedes abonarla en efectivo en el local o escribirnos por WhatsApp al <strong>684 657 760</strong>. '
        f'Recuerda que la fianza debe estar abonada como máximo 4 días antes de la celebración.</p>'
    )
    return {"subject": f"Recordatorio: fianza de tu reserva en Indiana Bill ({importe}€)", "html": _wrap(inner)}


def build_verification_email(nombre: str, link: str) -> dict:
    inner = (
        f'<p style="font-size:17px;">Hola <strong>{nombre}</strong>,</p>'
        f'<p>Confirma tu email para activar tu cuenta y poder consultar tus reservas en Indiana Bill.</p>'
        f'<div style="text-align:center; margin:28px 0;">'
        f'<a href="{link}" style="background:#22c55e; color:#fff; padding:14px 28px; border-radius:50px; text-decoration:none; font-weight:bold;">Verificar mi email</a></div>'
        f'<p style="color:#666; font-size:13px;">Si no creaste esta cuenta, puedes ignorar este correo.</p>'
    )
    return {"subject": "Verifica tu email — Indiana Bill Gijón", "html": _wrap(inner)}


def build_business_new_reserva_email(lead) -> dict:
    inner = (
        f'<p style="font-size:16px;"><strong>Nueva reserva / lead registrado</strong></p>'
        f'<p><strong>{lead.nombre}</strong> · <a href="tel:{lead.telefono}">{lead.telefono}</a></p>'
        f'<ul style="color:#444; font-size:14px;">'
        f'<li>Fecha cumpleaños: {lead.fecha_cumpleanos or "—"}</li>'
        f'<li>Nº niños: {lead.num_ninos or "—"}</li>'
        f'<li>Servicio: {lead.servicio or "—"} · Origen: {getattr(lead.origen, "value", lead.origen)}</li>'
        f'<li>Comentarios: {lead.comentarios or "—"}</li>'
        f'</ul>'
    )
    return {"subject": f"🆕 Nueva reserva: {lead.nombre}", "html": _wrap(inner)}


def build_business_fianza_paid_email(lead) -> dict:
    inner = (
        f'<p style="font-size:16px;">💶 <strong>Fianza pagada</strong> — reserva confirmada</p>'
        f'<p><strong>{lead.nombre}</strong> · <a href="tel:{lead.telefono}">{lead.telefono}</a></p>'
        f'<p style="color:#444; font-size:14px;">Cumpleaños: {lead.fecha_cumpleanos or "—"} · Importe: {lead.fianza_importe or 20}€ · Método: {lead.fianza_metodo or "—"}</p>'
    )
    return {"subject": f"✅ Fianza pagada: {lead.nombre}", "html": _wrap(inner)}


def build_business_digest_email(items: list) -> dict:
    filas = "".join(
        f'<tr><td style="padding:6px 10px; border-bottom:1px solid #eee;">{i["nombre"]}</td>'
        f'<td style="padding:6px 10px; border-bottom:1px solid #eee;">{i["telefono"]}</td>'
        f'<td style="padding:6px 10px; border-bottom:1px solid #eee;">{i["fecha"]}</td>'
        f'<td style="padding:6px 10px; border-bottom:1px solid #eee; color:#dc2626; font-weight:bold;">{"HOY" if i["dias"]==0 else str(i["dias"])+" d"}</td></tr>'
        for i in items
    )
    inner = (
        f'<p style="font-size:16px;">⚠️ <strong>Fianzas pendientes</strong> (cumpleaños en 4 días o menos)</p>'
        f'<table style="width:100%; border-collapse:collapse; font-size:14px;">'
        f'<tr style="text-align:left; color:#888;"><th style="padding:6px 10px;">Cliente</th><th style="padding:6px 10px;">Teléfono</th><th style="padding:6px 10px;">Fecha</th><th style="padding:6px 10px;">Faltan</th></tr>'
        f'{filas}</table>'
        f'<p style="color:#666; font-size:13px; margin-top:16px;">Contacta a estas familias para cobrar la fianza antes del cumpleaños.</p>'
    )
    return {"subject": f"⚠️ {len(items)} fianza(s) pendiente(s) — Indiana Bill", "html": _wrap(inner)}


# ── MOTOR DE RECORDATORIOS ────────────────────────────────────────────────────

def _ya_enviado(db, tipo, lead_id) -> bool:
    from ..models.email_job import EmailJob, EmailJobEstado
    return db.query(EmailJob).filter(
        EmailJob.tipo == tipo,
        EmailJob.lead_id == lead_id,
        EmailJob.estado == EmailJobEstado.ENVIADO,
    ).first() is not None


def _log_job(db, tipo, lead_id, email, nombre, ok, datos=None):
    from ..models.email_job import EmailJob, EmailJobEstado
    db.add(EmailJob(
        tipo=tipo,
        estado=EmailJobEstado.ENVIADO if ok else EmailJobEstado.FALLIDO,
        destinatario_email=email,
        destinatario_nombre=nombre,
        datos_json=json.dumps(datos or {}),
        enviado_at=datetime.now(timezone.utc),
        lead_id=lead_id,
    ))


def run_reminders(db) -> dict:
    """
    Revisa las reservas y envía recordatorios de fianza pendiente.
    - Cliente: si el cumpleaños es en ≤4 días y la fianza no está pagada (1 vez/lead).
    - Negocio: resumen diario de fianzas pendientes ≤4 días (1 vez/día).
    Pensado para ejecutarse a diario por un cron. No lanza excepciones.
    """
    from ..models.lead import Lead, LeadEstado
    from ..models.email_job import EmailJob, EmailJobTipo, EmailJobEstado

    if not email_configured():
        return {"status": "email_no_configurado", "enviados_cliente": 0, "pendientes": 0}

    hoy = date.today()
    leads = db.query(Lead).filter(Lead.fecha_cumpleanos.isnot(None)).all()

    enviados_cliente = 0
    digest = []
    for lead in leads:
        if lead.estado in (LeadEstado.CANCELADO, LeadEstado.NO_CONVERTIDO, LeadEstado.CELEBRADO):
            continue
        if lead.fianza_pagada:
            continue
        try:
            fecha = datetime.strptime(lead.fecha_cumpleanos[:10], "%Y-%m-%d").date()
        except Exception:
            continue
        dias = (fecha - hoy).days
        if dias < 0 or dias > 4:
            continue

        digest.append({"nombre": lead.nombre, "telefono": lead.telefono, "fecha": lead.fecha_cumpleanos, "dias": dias})

        # Recordatorio al cliente (una sola vez por lead)
        if lead.email and not _ya_enviado(db, EmailJobTipo.FIANZA_REMINDER, lead.id):
            data = build_fianza_reminder_email(lead.nombre, lead.fianza_importe or settings.fianza_amount_eur, dias)
            ok = send_email(lead.email, lead.nombre, data["subject"], data["html"])
            _log_job(db, EmailJobTipo.FIANZA_REMINDER, lead.id, lead.email, lead.nombre, ok, {"dias": dias})
            if ok:
                enviados_cliente += 1

    # Resumen al negocio (una vez al día)
    digest_enviado = False
    if digest:
        ya_hoy = db.query(EmailJob).filter(
            EmailJob.tipo == EmailJobTipo.BUSINESS_NOTIFY,
            EmailJob.estado == EmailJobEstado.ENVIADO,
            EmailJob.enviado_at >= datetime.combine(hoy, datetime.min.time()),
        ).first()
        if not ya_hoy:
            data = build_business_digest_email(digest)
            ok = notify_business(data["subject"], data["html"])
            _log_job(db, EmailJobTipo.BUSINESS_NOTIFY, None, settings.notify_email, "Indiana Bill", ok, {"n": len(digest)})
            digest_enviado = ok

    db.commit()
    return {
        "status": "ok",
        "enviados_cliente": enviados_cliente,
        "pendientes": len(digest),
        "resumen_negocio": digest_enviado,
    }


# ── Compatibilidad con el router de automation (recordatorios de cumpleaños) ──

def build_birthday_reminder_email(nombre_padre: str, nombre_nino: str, dias_restantes: int) -> dict:
    inner = (
        f'<p style="font-size:17px;">Hola <strong>{nombre_padre}</strong>,</p>'
        f'<p>El cumpleaños de <strong>{nombre_nino}</strong> es en <strong>{dias_restantes} días</strong>. ¿Ya tenéis plan?</p>'
        f'<div style="text-align:center; margin:28px 0;">'
        f'<a href="{settings.public_base_url}/cumpleanos" style="background:#22c55e; color:#fff; padding:14px 28px; border-radius:50px; text-decoration:none; font-weight:bold;">Ver disponibilidad</a></div>'
        f'<p style="color:#666; font-size:14px;">O llámanos al <strong>684 657 760</strong>.</p>'
    )
    return {"subject": f"¡El cumpleaños de {nombre_nino} se acerca! 🎂", "html": _wrap(inner)}
