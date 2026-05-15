"""
Servicio de WhatsApp Business API — STUB.

CONFIGURACIÓN PENDIENTE:
  Necesitas una cuenta de WhatsApp Business API. Opciones:
  1. Twilio (más fácil): https://www.twilio.com/whatsapp
     TWILIO_ACCOUNT_SID=ACxxxx
     TWILIO_AUTH_TOKEN=xxxx
     TWILIO_WA_NUMBER=whatsapp:+14155238886

  2. Meta Cloud API (oficial, más barato):
     WA_PHONE_NUMBER_ID=xxxxx
     WA_ACCESS_TOKEN=EAAxxxxxx
     WA_VERIFY_TOKEN=tu_token_secreto_para_webhook

FLUJOS AUTOMÁTICOS PLANIFICADOS:
  1. Confirmación de lead → mensaje al padre/madre con resumen de solicitud
  2. Recordatorio 48h antes de la fiesta
  3. Seguimiento post-celebración (encuesta satisfacción + invitación a reseña Google)

WEBHOOK:
  El endpoint /api/automation/webhook/whatsapp recibe mensajes entrantes
  (cuando el cliente responde) para futuro bot de respuesta automática.
"""

import logging
import os

logger = logging.getLogger(__name__)


async def send_whatsapp_message(to_number: str, message: str) -> bool:
    """
    Envía un mensaje de WhatsApp. Devuelve True si se envió.

    TODO: Descomentar una implementación cuando tengas las credenciales.
    """
    raise NotImplementedError(
        "Configura TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN o WA_ACCESS_TOKEN en .env"
    )

    # ── IMPLEMENTACIÓN TWILIO ──────────────────────────────────────────────
    # from twilio.rest import Client
    # try:
    #     client = Client(os.environ["TWILIO_ACCOUNT_SID"], os.environ["TWILIO_AUTH_TOKEN"])
    #     client.messages.create(
    #         from_=os.environ["TWILIO_WA_NUMBER"],
    #         to=f"whatsapp:{to_number}",
    #         body=message,
    #     )
    #     return True
    # except Exception as e:
    #     logger.error(f"Twilio WA error: {e}")
    #     return False

    # ── IMPLEMENTACIÓN META CLOUD API ──────────────────────────────────────
    # import httpx
    # try:
    #     phone_id = os.environ["WA_PHONE_NUMBER_ID"]
    #     token = os.environ["WA_ACCESS_TOKEN"]
    #     url = f"https://graph.facebook.com/v18.0/{phone_id}/messages"
    #     payload = {
    #         "messaging_product": "whatsapp",
    #         "to": to_number.replace("+", ""),
    #         "type": "text",
    #         "text": {"body": message},
    #     }
    #     async with httpx.AsyncClient() as client:
    #         r = await client.post(url, json=payload, headers={"Authorization": f"Bearer {token}"})
    #         return r.status_code == 200
    # except Exception as e:
    #     logger.error(f"Meta WA API error: {e}")
    #     return False


async def notify_new_lead(nombre: str, telefono: str, servicio: str, fecha: str) -> bool:
    """Notifica al equipo interno sobre un nuevo lead recibido."""
    staff_number = os.environ.get("WA_STAFF_NUMBER", "+34684657760")
    message = (
        f"🔔 *Nuevo lead en Indiana Bill*\n"
        f"👤 {nombre}\n"
        f"📞 {telefono}\n"
        f"🎂 Servicio: {servicio}\n"
        f"📅 Fecha deseada: {fecha or 'no indicada'}\n"
        f"Responde desde el panel: https://indianabillgijon.es/admin"
    )
    return await send_whatsapp_message(staff_number, message)
