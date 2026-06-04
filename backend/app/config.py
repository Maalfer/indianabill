"""
config.py — Configuración centralizada usando pydantic-settings.
Las variables se leen del archivo .env en la raíz del backend.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    app_name: str = "Indiana Bill Gijón"
    debug: bool = False
    cors_origins: List[str] = ["http://localhost:5173", "http://localhost:3000"]
    database_url: str = "postgresql://postgres:password@localhost:5432/indianabill"
    secret_key: str = "tu_secreto_super_seguro_aqui"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # ── Pagos / Stripe ───────────────────────────────────────────────────────
    stripe_secret_key: str = ""
    stripe_publishable_key: str = ""
    stripe_webhook_secret: str = ""
    fianza_amount_eur: int = 20
    public_base_url: str = "https://indianabill.duckdns.org"

    # ── Email (SMTP) y notificaciones ─────────────────────────────────────────
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_pass: str = ""
    email_from: str = ""
    email_from_name: str = "Indiana Bill Gijón"
    notify_email: str = "indianabillgijonasturias@gmail.com"
    automation_token: str = ""   # token para que el cron dispare los recordatorios

    model_config = SettingsConfigDict(
        env_file=".env", 
        env_file_encoding="utf-8",
        extra="ignore"  # Ignorar variables extra en el archivo .env
    )


# Instancia singleton exportada al resto de la app
settings = Settings()
