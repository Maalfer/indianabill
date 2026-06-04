"""
models/newsletter.py — Suscriptores de la newsletter (captación de emails desde la web).
"""

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..database import Base


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(120), unique=True, index=True, nullable=False)
    origen = Column(String(50), nullable=True, default="web")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
