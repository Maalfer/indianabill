"""
Blog router — artículos SEO estáticos.
Los artículos están definidos en código para máxima velocidad y sin necesidad de CMS.
Cuando el volumen crezca, migrar a una tabla `articles` en la base de datos.
"""

from fastapi import APIRouter
from typing import List

router = APIRouter(prefix="/api/blog", tags=["blog"])

ARTICLES = [
    {
        "slug": "cumpleanos-infantiles-gijon-guia-completa",
        "titulo": "Cumpleaños infantiles en Gijón: guía completa 2025",
        "descripcion": "Todo lo que necesitas saber para organizar el cumpleaños perfecto para tu hijo en Gijón. Opciones, precios y consejos.",
        "categoria": "Cumpleaños",
        "fecha": "2025-01-15",
        "tiempo_lectura": 6,
        "imagen": "/blog/cumpleanos-gijon.jpg",
        "contenido": """
## Por qué Gijón es perfecta para celebrar cumpleaños infantiles

Gijón cuenta con una oferta creciente de espacios dedicados a las celebraciones infantiles.
Entre parques de bolas, ludotecas y salas temáticas, los padres tienen donde elegir.

## ¿Qué buscar en un lugar de cumpleaños?

Antes de reservar, ten en cuenta estos factores:

- **Espacio y capacidad:** ¿Cuántos niños van a venir? Asegúrate de que el espacio
  pueda albergar a todos con comodidad.
- **Actividades incluidas:** Toboganes, hinchables, piscinas de bolas y monitores
  marcan la diferencia entre una fiesta mediocre y una memorable.
- **Menú adaptado:** Los niños son exigentes. Elige un lugar que ofrezca menús
  pensados para ellos: nuggets, pizza, batidos...
- **Logística para los padres:** Un buen espacio también cuida a los adultos:
  zona de descanso, catering para los mayores, facilidad de aparcamiento.

## Indiana Bill: la referencia en Gijón

Indiana Bill Gijón lleva más de 10 años celebrando cumpleaños infantiles.
Con más de 500 celebraciones al año, ofrecemos:

- Parque cubierto con toboganes e hinchables
- Menús diseñados para niños
- Monitores incluidos en el precio
- Tarta y velas
- Regalo al niño anfitrión
- Más de 4 horas de juego

## Precios medios en Gijón

Los precios varían según el espacio y los servicios incluidos.
En Indiana Bill, los paquetes de cumpleaños arrancan **desde 19,50€ por niño**,
con un mínimo de 8 niños.

## Consejos para que el día salga perfecto

1. **Reserva con 3-4 semanas de antelación:** Los fines de semana se llenan rápido.
2. **Confirma el número exacto de asistentes:** Evita sorpresas de última hora.
3. **Avisa de alergias alimentarias:** La seguridad alimentaria es fundamental.
4. **Llega 15 minutos antes:** Para coordinarte con el equipo y que todo arranque puntual.
""",
        "keywords": ["cumpleaños infantiles Gijón", "fiestas cumpleaños niños Gijón", "ludoteca Gijón cumpleaños", "celebrar cumpleaños Gijón"],
    },
    {
        "slug": "juego-libre-parque-infantil-beneficios",
        "titulo": "Juego libre en parque infantil: 5 beneficios para el desarrollo de tu hijo",
        "descripcion": "El juego libre no estructurado es fundamental para el desarrollo cognitivo y emocional de los niños. Te explicamos por qué y cómo aprovecharlo.",
        "categoria": "Juego Libre",
        "fecha": "2025-02-10",
        "tiempo_lectura": 4,
        "imagen": "/blog/juego-libre.jpg",
        "contenido": """
## ¿Qué es el juego libre?

A diferencia de las actividades dirigidas, el juego libre permite al niño explorar,
crear y relacionarse **sin instrucciones de un adulto**. El niño decide a qué jugar,
cómo y con quién.

## 5 beneficios demostrados

### 1. Desarrollo de la autonomía

Cuando un niño toma sus propias decisiones de juego, practica la toma de decisiones
y la gestión de su tiempo. Habilidades que usará toda su vida.

### 2. Inteligencia emocional

El juego con otros niños obliga a negociar, ceder y gestionar frustraciones.
Es el mejor entrenamiento emocional que existe.

### 3. Creatividad e imaginación

Sin un guion predefinido, el niño inventa mundos, personajes y aventuras.
Los toboganes se convierten en montañas; la piscina de bolas, en un océano.

### 4. Actividad física natural

Los niños se mueven porque quieren, no porque se lo piden. Correr, saltar,
trepar... el ejercicio ocurre sin que nadie tenga que pedírselo.

### 5. Habilidades sociales

Aprender a compartir, esperar turno y cooperar son lecciones que solo el
juego entre iguales puede enseñar de forma auténtica.

## Indiana Bill: el espacio perfecto para el juego libre en Gijón

Nuestro parque cubierto está pensado para que los niños exploren libremente:
toboganes, hinchables, piscina de bolas, pista de fútbol y zona de escalada.

**Horario de juego libre:** martes a domingo desde las 17:00.
Consulta nuestros precios y el Bono Indy para familias que vienen a menudo.
""",
        "keywords": ["juego libre niños", "parque infantil Gijón", "beneficios juego libre", "ludoteca Gijón"],
    },
    {
        "slug": "fiestas-privadas-adultos-gijon-ideas",
        "titulo": "Fiestas privadas para adultos en Gijón: 6 ideas para salir de lo convencional",
        "descripcion": "Despedidas de soltero, cenas de empresa, fiestas de cumpleaños adultos... Si buscas algo diferente en Gijón, sigue leyendo.",
        "categoria": "Fiestas Privadas",
        "fecha": "2025-03-05",
        "tiempo_lectura": 5,
        "imagen": "/blog/fiestas-privadas.jpg",
        "contenido": """
## El problema de las fiestas convencionales

Bar de siempre, restaurante de siempre, karaoke de siempre...
Cuando se trata de celebrar algo especial, muchos grupos en Gijón
buscan una experiencia que no olvidarán.

## 6 ideas para una fiesta privada diferente en Gijón

### 1. Despedida de soltero/soltera con adrenalina

¿Por qué no combinar la diversión adulta con el parque? En Indiana Bill
puedes reservar el espacio completo para vuestro grupo y organizar
competiciones, juegos y una cena privada.

### 2. Fiesta de cumpleaños adulto "vuelta a la infancia"

La nostalgia es poderosa. Volver a los toboganes y las piscinas de bolas
de la mano de tus amigos adultos es una experiencia que genera recuerdos únicos.

### 3. Team building empresarial

Las dinámicas de juego son perfectas para romper el hielo y fomentar
la cohesión entre equipos de trabajo. Mejor que cualquier taller de empresa.

### 4. Celebración familiar multigeneracional

Abuelos, padres e hijos en el mismo espacio, jugando juntos.
El parque cubierto es accesible y seguro para todos.

### 5. Quedada de amigos con parque privado

Alquila el espacio completo para tu grupo de amigos una tarde/noche.
Música, catering y el parque solo para vosotros.

### 6. Cena con actividad incluida

Combina una cena privada con las instalaciones del parque para
una velada que nadie esperaba.

## Reservar una fiesta privada en Indiana Bill

Contacta con nosotros con al menos 2 semanas de antelación.
Cuéntanos tu idea y adaptamos el espacio a vuestras necesidades.

📞 684 657 760 · WhatsApp disponible
""",
        "keywords": ["fiestas privadas Gijón", "despedida soltero Gijón", "eventos privados Gijón", "alquiler espacio fiestas Gijón"],
    },
]


@router.get("/articles")
def list_articles():
    return [
        {k: v for k, v in a.items() if k != "contenido"}
        for a in ARTICLES
    ]


@router.get("/articles/{slug}")
def get_article(slug: str):
    article = next((a for a in ARTICLES if a["slug"] == slug), None)
    if not article:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return article
