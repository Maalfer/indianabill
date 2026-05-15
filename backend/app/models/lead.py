from sqlalchemy import Column, Integer, String, DateTime, Text, Enum as SAEnum
from sqlalchemy.sql import func
from ..database import Base
import enum


class LeadEstado(enum.Enum):
    NUEVO = "nuevo"
    PENDIENTE = "pendiente"
    CONTACTADO = "contactado"
    RESERVA_INICIADA = "reserva_iniciada"
    RESERVA_CONFIRMADA = "reserva_confirmada"
    COMPLETADO = "completado"
    PERDIDO = "perdido"


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
    estado = Column(SAEnum(LeadEstado), default=LeadEstado.NUEVO, nullable=False)
    origen = Column(SAEnum(LeadOrigen), default=LeadOrigen.WEB, nullable=False)
    notas_internas = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
