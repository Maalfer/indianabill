from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Enum as SAEnum
from sqlalchemy.sql import func
from ..database import Base
import enum


class LeadEstado(enum.Enum):
    # Flujo de reserva (BLOQUE 11 del documento maestro)
    CONSULTA_RECIBIDA = "consulta_recibida"
    INFORMACION_ENVIADA = "informacion_enviada"
    INTERESADO = "interesado"
    DISPONIBILIDAD_SOLICITADA = "disponibilidad_solicitada"
    DISPONIBILIDAD_CONFIRMADA = "disponibilidad_confirmada"
    DATOS_RECIBIDOS = "datos_recibidos"
    PENDIENTE_LLAMADA = "pendiente_llamada"
    PENDIENTE_GESTION = "pendiente_gestion"
    PENDIENTE_FIANZA = "pendiente_fianza"
    PENDIENTE_FIANZA_PRESENCIAL = "pendiente_fianza_presencial"
    FIANZA_RECIBIDA = "fianza_recibida"
    RESERVA_CONFIRMADA = "reserva_confirmada"
    PENDIENTE_NUMERO_FINAL = "pendiente_numero_final"
    CONFIRMACION_FINAL = "confirmacion_final"
    CELEBRADO = "celebrado"
    CANCELADO = "cancelado"
    NO_CONVERTIDO = "no_convertido"


class LeadOrigen(enum.Enum):
    WEB = "web"
    GOOGLE_ADS = "google_ads"
    META_ADS = "meta_ads"
    SEO = "seo"
    INSTAGRAM = "instagram"
    TIKTOK = "tiktok"
    RECOMENDACION = "recomendacion"
    CLIENTE_RECURRENTE = "cliente_recurrente"
    JUEGO_LIBRE = "juego_libre"
    BONO = "bono"
    MARTES_FAMILIA = "martes_familia"
    OTRO = "otro"


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    telefono = Column(String(20), nullable=False)
    email = Column(String(100), nullable=True)
    fecha_cumpleanos = Column(String(50), nullable=True)
    num_ninos = Column(Integer, nullable=True)
    nombre_nino = Column(String(100), nullable=True)
    fecha_nacimiento_nino = Column(String(50), nullable=True)
    num_invitados = Column(Integer, nullable=True)
    comentarios = Column(Text, nullable=True)
    servicio = Column(String(50), nullable=True, default="cumpleanos")
    estado = Column(SAEnum(LeadEstado, length=32), default=LeadEstado.CONSULTA_RECIBIDA, nullable=False)
    origen = Column(SAEnum(LeadOrigen), default=LeadOrigen.WEB, nullable=False)
    notas_internas = Column(Text, nullable=True)
    # ── Reserva / fianza (BLOQUE 11-12) ──────────────────────────────────────
    num_invitados_final = Column(Integer, nullable=True)
    fianza_pagada = Column(Boolean, default=False, nullable=False)
    fianza_importe = Column(Integer, nullable=True, default=20)
    fianza_metodo = Column(String(20), nullable=True)        # 'sms' | 'efectivo'
    fianza_fecha_pago = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
