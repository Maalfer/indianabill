"""
routers/leads.py — Endpoints de captación de leads (formularios web)
"""

from datetime import datetime, date, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from ..models.lead import Lead, LeadEstado, LeadOrigen
from ..schemas.lead import LeadCreate, LeadResponse, LeadUpdate, LeadClientResponse
from .admin import get_admin_user
from .auth import get_current_user
from ..models.user import User
from ..services import email_service

router = APIRouter(prefix="/api/leads", tags=["leads"])

_ORIGEN_VALUES = {e.value for e in LeadOrigen}


@router.post("/", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(lead: LeadCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    """Crear un lead/reserva. Lo usa recepción (panel) o el sistema."""
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
        estado=LeadEstado.CONSULTA_RECIBIDA,
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)

    # Notificación interna al negocio (best-effort, en segundo plano)
    try:
        data = email_service.build_business_new_reserva_email(db_lead)
        background_tasks.add_task(email_service.notify_business, data["subject"], data["html"])
    except Exception:
        pass

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

    # ── Alertas de fianza: cumpleaños en ≤4 días con fianza sin pagar ────────
    en_4_dias = hoy + timedelta(days=4)
    alertas_fianza = []
    pendientes_fianza = 0
    for lead in proximos_raw:
        if lead.estado in (LeadEstado.CANCELADO, LeadEstado.NO_CONVERTIDO, LeadEstado.CELEBRADO):
            continue
        if getattr(lead, "fianza_pagada", False):
            continue
        try:
            fecha = datetime.strptime(lead.fecha_cumpleanos[:10], "%Y-%m-%d").date()
        except Exception:
            continue
        if fecha < hoy:
            continue
        pendientes_fianza += 1
        if fecha <= en_4_dias:
            alertas_fianza.append({
                "id": lead.id,
                "nombre": lead.nombre,
                "telefono": lead.telefono,
                "fecha_cumpleanos": lead.fecha_cumpleanos,
                "dias_restantes": (fecha - hoy).days,
            })
    alertas_fianza.sort(key=lambda x: x["dias_restantes"])

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
        "alertas_fianza": alertas_fianza,
        "pendientes_fianza": pendientes_fianza,
        "recientes": recientes_data,
    }


@router.get("/mias", response_model=List[LeadClientResponse])
def get_mis_leads(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Reservas del cliente autenticado (vinculadas por su email)."""
    if not current_user.email or not getattr(current_user, "verificado", True):
        return []
    return (
        db.query(Lead)
        .filter(func.lower(Lead.email) == current_user.email.lower())
        .order_by(Lead.created_at.desc())
        .all()
    )


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
    background_tasks: BackgroundTasks,
    admin_user: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    """Actualizar estado/notas/fianza de un lead — solo admin."""
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead no encontrado")

    fianza_antes = lead.fianza_pagada

    if update.estado is not None:
        lead.estado = update.estado
    if update.notas_internas is not None:
        lead.notas_internas = update.notas_internas
    if update.fecha_cumpleanos is not None:
        lead.fecha_cumpleanos = update.fecha_cumpleanos
    if update.num_ninos is not None:
        lead.num_ninos = update.num_ninos
    if update.num_invitados is not None:
        lead.num_invitados = update.num_invitados
    if update.num_invitados_final is not None:
        lead.num_invitados_final = update.num_invitados_final
    if update.fianza_pagada is not None:
        lead.fianza_pagada = update.fianza_pagada
    if update.fianza_importe is not None:
        lead.fianza_importe = update.fianza_importe
    if update.fianza_metodo is not None:
        lead.fianza_metodo = update.fianza_metodo or None
    if update.fianza_fecha_pago is not None:
        lead.fianza_fecha_pago = update.fianza_fecha_pago or None

    db.commit()
    db.refresh(lead)

    # Si la fianza acaba de marcarse como pagada, avisar al negocio
    if lead.fianza_pagada and not fianza_antes:
        try:
            data = email_service.build_business_fianza_paid_email(lead)
            background_tasks.add_task(email_service.notify_business, data["subject"], data["html"])
        except Exception:
            pass

    return lead
