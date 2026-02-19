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

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


# Instancia singleton exportada al resto de la app
settings = Settings()
