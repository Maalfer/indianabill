"""
main.py — Punto de entrada de la aplicación FastAPI.
Configura CORS, registra routers y define la ruta raíz de health-check.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import info

app = FastAPI(
    title=settings.app_name,
    description="API REST del Indiana Bill Gijón – ludoteca y espacio de celebraciones.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(info.router)


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/", tags=["health"])
def root() -> dict:
    """Health check endpoint."""
    return {"status": "ok", "app": settings.app_name}
