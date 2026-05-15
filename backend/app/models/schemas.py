"""
schemas.py — Modelos Pydantic para las respuestas de la API.
"""

from pydantic import BaseModel
from typing import List


class InfoResponse(BaseModel):
    nombre: str
    descripcion: str
    telefono: str
    email: str
    direccion: str
    ciudad: str
    metros_cuadrados: int


class ServicioItem(BaseModel):
    id: str
    titulo: str
    descripcion: str
    precio: str
    icono: str
    color: str


class HorarioDia(BaseModel):
    dia: str
    apertura: str
    cierre: str
    abierto: bool


class HorarioResponse(BaseModel):
    horario: List[HorarioDia]
    nota: str


class FAQItem(BaseModel):
    pregunta: str
    respuesta: str


class FAQResponse(BaseModel):
    items: List[FAQItem]
