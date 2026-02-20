"""
info.py — Router con los endpoints de información pública del centro.
"""

from fastapi import APIRouter
from app.models.schemas import (
    InfoResponse,
    ServicioItem,
    HorarioResponse,
    HorarioDia,
    FAQItem,
    FAQResponse,
)

router = APIRouter(prefix="/api", tags=["info"])


@router.get("/info", response_model=InfoResponse, summary="Información general del centro")
def get_info() -> InfoResponse:
    """Devuelve los datos generales del Indiana Bill de Gijón."""
    return InfoResponse(
        nombre="Indiana Bill Gijón",
        descripcion=(
            "Ludoteca de más de 1300 metros cuadrados para celebrar cumpleaños "
            "infantiles, fiestas para adolescentes y adultos en el centro de Gijón."
        ),
        telefono="+34 984 000 000",
        email="info@indianabillgijon.es",
        direccion="Calle Mayor, 1",
        ciudad="Gijón, Asturias",
        metros_cuadrados=1300,
    )


@router.get("/servicios", response_model=list[ServicioItem], summary="Listado de servicios")
def get_servicios() -> list[ServicioItem]:
    """Devuelve todos los servicios disponibles con descripción y precios."""
    return [
        ServicioItem(
            id="cumpleanos-infantiles",
            titulo="Cumpleaños Infantiles",
            descripcion=(
                "Celebra el cumpleaños de los más pequeños de forma especial. "
                "Toboganes, parque de bolas, pista de fútbol y mucho más."
            ),
            precio="Desde 12€/niño",
            icono="🎂",
            color="#4A90D9",
        ),
        ServicioItem(
            id="fiestas-adultos",
            titulo="Fiestas para Adultos",
            descripcion=(
                "Vuelve a ser niño con tus amigos. Organiza tu evento privado "
                "en nuestro espacio de más de 1300 m² en el centro de Gijón."
            ),
            precio="Desde 20€/persona",
            icono="🎉",
            color="#E85D4A",
        ),
        ServicioItem(
            id="ven-a-jugar",
            titulo="Ven a Jugar",
            descripcion=(
                "¡No tienes que esperar a que sea tu cumpleaños! Disfruta "
                "de todas las instalaciones con nuestras entradas de acceso libre."
            ),
            precio="Desde 8€/niño",
            icono="🎮",
            color="#00A851",
        ),
        ServicioItem(
            id="bonos-vip",
            titulo="Bonos y Socios VIP",
            descripcion=(
                "Si vienes a menudo, el bono VIP es la opción más económica. "
                "Acceso ilimitado a precio reducido durante todo el año."
            ),
            precio="Bono anual desde 120€",
            icono="⭐",
            color="#F5A623",
        ),
    ]


@router.get("/horario", response_model=HorarioResponse, summary="Horario semanal")
def get_horario() -> HorarioResponse:
    """Devuelve el horario de apertura semanal del centro."""
    return HorarioResponse(
        horario=[
            HorarioDia(dia="Lunes",     apertura="16:00", cierre="21:00", abierto=True),
            HorarioDia(dia="Martes",    apertura="16:00", cierre="21:00", abierto=True),
            HorarioDia(dia="Miércoles", apertura="16:00", cierre="21:00", abierto=True),
            HorarioDia(dia="Jueves",    apertura="16:00", cierre="21:00", abierto=True),
            HorarioDia(dia="Viernes",   apertura="16:00", cierre="22:00", abierto=True),
            HorarioDia(dia="Sábado",    apertura="11:00", cierre="22:00", abierto=True),
            HorarioDia(dia="Domingo",   apertura="11:00", cierre="21:00", abierto=True),
        ],
        nota="Horario de temporada baja. Puede variar en festivos y vacaciones escolares.",
    )


@router.get("/faq", response_model=FAQResponse, summary="Preguntas frecuentes")
def get_faq() -> FAQResponse:
    """Devuelve las preguntas frecuentes del centro."""
    return FAQResponse(
        items=[
            FAQItem(
                pregunta="¿Cómo se reserva?",
                respuesta=(
                    "Puedes reservar a través de nuestro formulario de contacto, "
                    "por teléfono o escribiéndonos por WhatsApp. Te confirmaremos "
                    "disponibilidad en menos de 24 horas."
                ),
            ),
            FAQItem(
                pregunta="¿Qué edades pueden venir a jugar?",
                respuesta=(
                    "El área de juego infantil está pensada para niños de 2 a 12 años. "
                    "Para adolescentes y adultos disponemos de espacios adaptados "
                    "y eventos privados."
                ),
            ),
            FAQItem(
                pregunta="¿Hay menús para alérgicos o especiales?",
                respuesta=(
                    "Sí, disponemos de opciones para celíacos, alérgicos al gluten "
                    "y otros requisitos dietéticos. Consúltanos al hacer la reserva."
                ),
            ),
            FAQItem(
                pregunta="¿Hay mínimo o máximo de personas para una reserva?",
                respuesta=(
                    "Para cumpleaños infantiles el mínimo es de 8 niños. "
                    "Para eventos privados de adultos, consúltanos sin compromiso, "
                    "nos adaptamos a grupos de todos los tamaños."
                ),
            ),
            FAQItem(
                pregunta="¿Es seguro venir a jugar y celebrar?",
                respuesta=(
                    "Todas nuestras instalaciones cumplen la normativa vigente de "
                    "seguridad infantil. Contamos con monitores cualificados y "
                    "el espacio está supervisado en todo momento."
                ),
            ),
            FAQItem(
                pregunta="¿Qué incluye la celebración de cumpleaños?",
                respuesta=(
                    "Nuestras celebraciones de cumpleaños incluyen acceso a todas las instalaciones, monitor especializado, música ambientada, y opciones de menús adaptados a todas las edades y necesidades alimenticias. "
                    "También disponemos de packs adicionales como decoración temática, animación y fotografía profesional para hacer tu fiesta aún más especial."
                ),
            ),
        ]
    )
