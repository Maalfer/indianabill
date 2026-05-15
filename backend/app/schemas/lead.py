from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from ..models.lead import LeadEstado, LeadOrigen


class LeadCreate(BaseModel):
    nombre: str
    telefono: str
    email: Optional[str] = None
    fecha_cumpleanos: Optional[str] = None
    num_ninos: Optional[int] = None
    nombre_nino: Optional[str] = None
    fecha_nacimiento_nino: Optional[str] = None
    num_invitados: Optional[int] = None
    comentarios: Optional[str] = None
    servicio: Optional[str] = "cumpleanos"
    origen: Optional[str] = "web"


class LeadUpdate(BaseModel):
    estado: Optional[LeadEstado] = None
    notas_internas: Optional[str] = None


class LeadResponse(BaseModel):
    id: int
    nombre: str
    telefono: str
    email: Optional[str] = None
    fecha_cumpleanos: Optional[str] = None
    num_ninos: Optional[int] = None
    nombre_nino: Optional[str] = None
    fecha_nacimiento_nino: Optional[str] = None
    num_invitados: Optional[int] = None
    comentarios: Optional[str] = None
    servicio: Optional[str] = None
    estado: LeadEstado
    origen: LeadOrigen
    notas_internas: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
