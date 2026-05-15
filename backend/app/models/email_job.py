import enum
from sqlalchemy import Column, Integer, String, DateTime, Text, Enum as SAEnum
from sqlalchemy.sql import func
from ..database import Base


class EmailJobTipo(enum.Enum):
    BIRTHDAY_REMINDER_30 = "birthday_reminder_30"
    BIRTHDAY_REMINDER_7 = "birthday_reminder_7"
    LEAD_FOLLOWUP = "lead_followup"
    RESERVA_CONFIRMADA = "reserva_confirmada"
    WELCOME = "welcome"


class EmailJobEstado(enum.Enum):
    PENDIENTE = "pendiente"
    ENVIADO = "enviado"
    FALLIDO = "fallido"
    CANCELADO = "cancelado"


class EmailJob(Base):
    __tablename__ = "email_jobs"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(SAEnum(EmailJobTipo), nullable=False)
    estado = Column(SAEnum(EmailJobEstado), default=EmailJobEstado.PENDIENTE, nullable=False)
    destinatario_email = Column(String(100), nullable=True)
    destinatario_nombre = Column(String(100), nullable=True)
    datos_json = Column(Text, nullable=True)  # JSON con variables de plantilla
    programado_para = Column(DateTime(timezone=True), nullable=True)
    enviado_at = Column(DateTime(timezone=True), nullable=True)
    lead_id = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
