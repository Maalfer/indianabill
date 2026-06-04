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
                    "Muy fácil. Escríbenos por WhatsApp, llámanos o pásate por el local con la fecha que quieres. "
                    "Te confirmamos disponibilidad y, para oficializar la reserva del cumpleaños, se deja una fianza de 20€. "
                    "Una vez abonada la fianza, la fecha queda confirmada."
                ),
            ),
            FAQItem(
                pregunta="¿Qué edades pueden venir?",
                respuesta=(
                    "El parque infantil está pensado para niños de 0 a 12 años. "
                    "Los martes, en nuestro formato Martes en Familia, los padres y hermanos mayores "
                    "también pueden jugar acompañando al menor. "
                    "Para adolescentes, adultos o celebraciones especiales, la mejor opción son nuestras Fiestas Privadas."
                ),
            ),
            FAQItem(
                pregunta="¿Dónde celebrar cumpleaños infantiles en Gijón?",
                respuesta=(
                    "Indiana Bill lleva más de 25 años siendo el lugar de referencia para cumpleaños infantiles en Gijón. "
                    "Más de 1.000 cumpleaños al año en un espacio de más de 1.300 m² cubiertos en pleno centro de la ciudad."
                ),
            ),
            FAQItem(
                pregunta="¿Qué incluye el cumpleaños?",
                respuesta=(
                    "El cumpleaños incluye acceso ilimitado al parque durante toda la celebración, merienda completa, "
                    "bebida, tarta con velas, regalo para el anfitrión y monitores especializados. "
                    "Nosotros nos encargamos de todo para que vosotros solo tengáis que disfrutar."
                ),
            ),
            FAQItem(
                pregunta="¿Cuánto dura el cumpleaños?",
                respuesta=(
                    "La celebración dura aproximadamente 4 horas. "
                    "Los niños tienen acceso ilimitado al parque durante todo ese tiempo."
                ),
            ),
            FAQItem(
                pregunta="¿Hay tiempo límite en el juego libre?",
                respuesta=(
                    "En el juego libre puedes disfrutar todo lo que quieras dentro del horario de apertura del día. "
                    "No hay contador de tiempo ni límite por sesión."
                ),
            ),
            FAQItem(
                pregunta="¿Se puede venir sin reserva?",
                respuesta=(
                    "Para el juego libre no hace falta reserva, puedes venir directamente. "
                    "Para cumpleaños y fiestas privadas sí es necesario reservar con antelación, "
                    "ya que las fechas se agotan rápido."
                ),
            ),
            FAQItem(
                pregunta="¿Nos adaptamos al tamaño del grupo?",
                respuesta=(
                    "Nos adaptamos al grupo y al presupuesto para que podáis celebrar y pasarlo bien. "
                    "La idea es que los peques disfruten y que podáis celebrar de la forma más cómoda posible. "
                    "Si sois pocos o tenéis dudas, escribidnos y os orientamos."
                ),
            ),
            FAQItem(
                pregunta="¿Hay menús para alergias o intolerancias?",
                respuesta=(
                    "Sí. Disponemos de opciones para celíacos, alérgicos al gluten y otras necesidades dietéticas. "
                    "Solo consúltanos al hacer la reserva y lo gestionamos sin problema."
                ),
            ),
            FAQItem(
                pregunta="¿Hay aparcamiento cerca?",
                respuesta=(
                    "Sí, hay opciones de aparcamiento muy cercanas al local. "
                    "Consúltanos y te indicamos las mejores opciones según tu punto de llegada."
                ),
            ),
            FAQItem(
                pregunta="¿Se puede llevar tarta de fuera?",
                respuesta=(
                    "La celebración ya incluye tarta. Si queréis traer una tarta especial o personalizada, "
                    "consúltanos y lo valoramos juntos sin problema."
                ),
            ),
            FAQItem(
                pregunta="¿Qué días suele haber más disponibilidad?",
                respuesta=(
                    "Los fines de semana son los más solicitados y se reservan con semanas de antelación. "
                    "Si tienes flexibilidad, los días entre semana suelen tener más disponibilidad. "
                    "Escríbenos y te ayudamos a encontrar la mejor fecha."
                ),
            ),
            FAQItem(
                pregunta="¿Es seguro venir a jugar y celebrar?",
                respuesta=(
                    "Totalmente. Todas nuestras instalaciones cumplen la normativa de seguridad infantil vigente. "
                    "Contamos con monitores cualificados y el espacio está supervisado en todo momento."
                ),
            ),
        ]
    )
