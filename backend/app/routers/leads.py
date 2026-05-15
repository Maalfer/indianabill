"""
routers/leads.py — Endpoints de captación de leads (formularios web)
"""

from datetime import datetime, date, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.lead import Lead, LeadEstado, LeadOrigen
from ..schemas.lead import LeadCreate, LeadResponse, LeadUpdate
from .admin import get_admin_user
from ..models.user import User

router = APIRouter(prefix="/api/leads", tags=["leads"])

_ORIGEN_VALUES = {e.value for e in LeadOrigen}


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    """Crear un lead desde el formulario web. Endpoint público."""
    origen = LeadOrigen(lead.origen) if lead.origen in _ORIGEN_VALUES else LeadOrigen.WEB

    db_lead = Lead(
        nombre=lead.nombre,
        telefono=lead.telefono,
        email=lead.email,
        fecha_cumpleanos=lead.fecha_cumpleanos,
        num_ninos=lead.num_ninos,
        nombre_nino=lead.nombre_nino,
        fecha_nacimiento_nino=lead.fecha_nacimiento_nino,
        num_invitados=lead.num_invitados,
        comentarios=lead.comentarios,
        servicio=lead.servicio,
        origen=origen,
        estado=LeadEstado.NUEVO,
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    return db_lead


@router.get("/", response_model=List[LeadResponse])
def get_leads(
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Listar todos los leads — solo admin."""
    return db.query(Lead).order_by(Lead.created_at.desc()).all()


@router.get("/stats/resumen")
def get_leads_stats(
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Estadísticas de leads para el dashboard de admin."""
    total = db.query(func.count(Lead.id)).scalar()

    por_estado = {}
    for estado in LeadEstado:
        count = db.query(func.count(Lead.id)).filter(Lead.estado == estado).scalar()
        por_estado[estado.value] = count

    hoy = date.today()
    en_30_dias = hoy + timedelta(days=30)

    proximos_raw = (
        db.query(Lead)
        .filter(Lead.fecha_cumpleanos.isnot(None))
        .order_by(Lead.created_at.desc())
        .all()
    )
    proximos = []
    for lead in proximos_raw:
        try:
            fecha = datetime.strptime(lead.fecha_cumpleanos[:10], "%Y-%m-%d").date()
            if hoy <= fecha <= en_30_dias:
                proximos.append({
                    "id": lead.id,
                    "nombre": lead.nombre,
                    "telefono": lead.telefono,
                    "nombre_nino": lead.nombre_nino,
                    "fecha_cumpleanos": lead.fecha_cumpleanos,
                    "num_ninos": lead.num_ninos,
                    "estado": lead.estado.value,
                })
        except Exception:
            continue

    proximos.sort(key=lambda x: x["fecha_cumpleanos"])

    recientes = db.query(Lead).order_by(Lead.created_at.desc()).limit(5).all()
    recientes_data = [
        {
            "id": l.id,
            "nombre": l.nombre,
            "telefono": l.telefono,
            "servicio": l.servicio,
            "estado": l.estado.value,
            "created_at": l.created_at.isoformat() if l.created_at else None,
        }
        for l in recientes
    ]

    esta_semana = db.query(func.count(Lead.id)).filter(
        Lead.created_at >= datetime.combine(hoy - timedelta(days=7), datetime.min.time())
    ).scalar()

    return {
        "total": total,
        "esta_semana": esta_semana,
        "por_estado": por_estado,
        "proximos_cumpleanos": proximos,
        "recientes": recientes_data,
    }


@router.get("/{lead_id}", response_model=LeadResponse)
def get_lead(
    lead_id: int,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")
    return lead


@router.put("/{lead_id}", response_model=LeadResponse)
def update_lead(
    lead_id: int,
    update: LeadUpdate,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Actualizar estado/notas de un lead — solo admin."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    if update.estado is not None:
        lead.estado = update.estado
    if update.notas_internas is not None:
        lead.notas_internas = update.notas_internas

    db.commit()
    db.refresh(lead)
    return lead
