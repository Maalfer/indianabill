import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FAQAccordion from '../components/FAQAccordion'
import Button from '../components/Button'
import Seo from '../components/Seo'
import './HomePage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const BASE = import.meta.env.BASE_URL

const WA_GENERAL = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20tengo%20una%20consulta%20sobre%20Indiana%20Bill%20Gij%C3%B3n'

const INCLUYE = [
    { icon: '🍔', label: 'Merienda completa' },
    { icon: '🎂', label: 'Tarta y velas' },
    { icon: '🎁', label: 'Regalo al anfitrión' },
    { icon: '⏱️', label: 'Más de 4h de juego' },
    { icon: '🏠', label: 'Parque cubierto' },
    { icon: '👩‍🏫', label: 'Monitores incluidos' },
    { icon: '🏋️', label: 'Hinchables y toboganes' },
    { icon: '🎳', label: 'Piscina de bolas' },
]

const COMO_FUNCIONA = [
    { num: '1', title: 'Elige la fecha', desc: 'Escríbenos por WhatsApp o llámanos con la fecha que quieres.' },
    { num: '2', title: 'Confirmamos', desc: 'Te respondemos en menos de 24 h con la disponibilidad.' },
    { num: '3', title: 'Reserva con fianza', desc: 'Pagáis una pequeña señal para confirmar la reserva.' },
    { num: '4', title: '¡A disfrutar!', desc: 'Nosotros nos encargamos del resto. Vosotros, a celebrar.' },
]

const SERVICIOS = [
    {
        to: '/cumpleanos',
        icon: '🎂',
        title: 'Cumpleaños infantiles',
        desc: 'La fiesta perfecta para niños de 0 a 12 años. Menús, tarta, actividades y espacio privado.',
        cta: 'Ver cumpleaños →',
        color: 'green',
    },
    {
        to: '/juego-libre',
        icon: '🎮',
        title: 'Juego libre',
        desc: 'Ven cuando quieras. Toboganes, hinchables, parque de bolas y pista de fútbol.',
        cta: 'Ver precios y horarios →',
        color: 'blue',
    },
    {
        to: '/fiestas-privadas',
        icon: '🎉',
        title: 'Fiestas privadas',
        desc: 'Para adultos, adolescentes, despedidas y grupos. Un plan diferente para cualquier ocasión.',
        cta: 'Ver fiestas privadas →',
        color: 'red',
    },
    {
        to: '/martes-en-familia',
        icon: '👨‍👩‍👧‍👦',
        title: 'Martes en Familia',
        desc: 'Los martes los adultos también pueden bajar al parque y jugar con los niños.',
        cta: 'Saber más →',
        color: 'yellow',
    },
    {
        to: '/dado-loco',
        icon: '🎲',
        title: 'Dado Loco',
        desc: 'Los miércoles tiras el dado. Si sale un 6, el juego ese día es gratis.',
        cta: 'Saber más →',
        color: 'gray',
    },
    {
        to: '/bono-indy',
        icon: '🎟️',
        title: 'Bono Indy',
        desc: '12 horas de juego por 39€. Válido martes, miércoles y jueves. La opción más económica.',
        cta: 'Ver bono →',
        color: 'green',
    },
]

const HORARIOS = [
    { dia: 'Lunes', hora: 'Cerrado (excepto vísperas y festivos)' },
    { dia: 'Martes y Jueves', hora: '17:00 a 21:00' },
    { dia: 'Miércoles', hora: '17:00 a 21:00' },
    { dia: 'Viernes, Sábado y Vísperas', hora: '17:00 a 21:30' },
    { dia: 'Domingo y Festivos', hora: '17:00 a 21:00' },
]

export default function HomePage() {
    const [faq, setFaq] = useState([])

    useEffect(() => {
        fetch(`${API}/api/faq`)
            .then((r) => r.json())
            .then((d) => setFaq(d.items))
            .catch(() => {})
    }, [])

    const fianzaParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('fianza') : null

    return (
        <>
            <Seo
                title="Cumpleaños Infantiles en Gijón | Indiana Bill — Parque cubierto 1.300 m²"
                description="Cumpleaños infantiles en Gijón sin complicaciones. Parque cubierto de 1.300 m² en el centro: merienda, tarta, monitores e hinchables. Desde 19,50€/niño."
                path="/"
            />
            {fianzaParam === 'ok' && (
                <div className="fianza-banner fianza-banner--ok">
                    ¡Fianza recibida! Tu reserva queda confirmada. Te esperamos en Indiana Bill
                </div>
            )}
            {fianzaParam === 'cancelada' && (
                <div className="fianza-banner fianza-banner--cancel">
                    El pago de la fianza se canceló. Si necesitas ayuda, escríbenos por WhatsApp o llámanos.
                </div>
            )}
            <HeroSection />

            {/* ── PRUEBA SOCIAL ──────────────────────────────────────────── */}
            <section className="home-stats">
                <div className="container">
                    <div className="home-stats__grid">
                        <div className="home-stat">
                            <div className="home-stat__num">+25</div>
                            <p className="home-stat__label">años celebrando<br/>cumpleaños en Gijón</p>
                        </div>
                        <div className="home-stat">
                            <div className="home-stat__num">+1.000</div>
                            <p className="home-stat__label">cumpleaños celebrados<br/>cada año</p>
                        </div>
                        <div className="home-stat">
                            <div className="home-stat__num">1.300 m²</div>
                            <p className="home-stat__label">de diversión cubierta<br/>en pleno centro</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── QUÉ INCLUYE ────────────────────────────────────────────── */}
            <section className="section home-incluye">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué incluye el cumpleaños?</h2>
                        <p>Todo preparado para que los peques disfruten al máximo</p>
                        <div className="divider" />
                    </header>
                    <div className="home-incluye__grid">
                        {INCLUYE.map((item) => (
                            <div key={item.label} className="home-incluye-item">
                                <span className="home-incluye-item__icon">{item.icon}</span>
                                <h4>{item.label}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRECIOS ────────────────────────────────────────────────── */}
            <section className="section home-precios" id="precios">
                <div className="container">
                    <header className="section-header">
                        <h2>Precios de cumpleaños</h2>
                        <p>Transparencia total — sin sorpresas</p>
                        <div className="divider" />
                        <div className="home-precios__badge">Desde 19,50€/niño</div>
                    </header>
                    <div className="home-precios__grid">
                        <Link to="/cumpleanos#menus" className="home-precio-card home-precio-card--link">
                            <h3>Menú Indy</h3>
                            <p className="home-precio-card__desc">Merienda + bebida + tarta + regalo</p>
                            <span className="home-precio-card__cta">Ver menú completo →</span>
                        </Link>
                        <Link to="/cumpleanos#menus" className="home-precio-card home-precio-card--featured home-precio-card--link">
                            <span className="home-precio-card__tag">Más completo</span>
                            <h3>Menú Super Indy</h3>
                            <p className="home-precio-card__desc">Todo incluido con extras especiales</p>
                            <span className="home-precio-card__cta">Ver menú completo →</span>
                        </Link>
                    </div>
                    <div className="home-precios__cta">
                        <Button href="/cumpleanos#menus" variant="primary" size="lg">
                            Ver menús completos y precios exactos
                        </Button>
                        <p className="home-precios__note">El precio incluye parque ilimitado durante toda la celebración.</p>
                    </div>
                </div>
            </section>

            {/* ── CÓMO FUNCIONA ──────────────────────────────────────────── */}
            <section className="section home-como">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo reservar?</h2>
                        <p>Reservar es muy sencillo. En 4 pasos tienes todo listo.</p>
                        <div className="divider" />
                    </header>
                    <div className="home-como__steps">
                        {COMO_FUNCIONA.map((s) => (
                            <div key={s.num} className="home-como__step">
                                <div className="home-como__step-num">{s.num}</div>
                                <h4>{s.title}</h4>
                                <p>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA WHATSAPP ────────────────────────────────────────────────────── */}
            <section className="home-wa-cta">
                <div className="container home-wa-cta__inner">
                    <div className="home-wa-cta__text">
                        <h2>¿Hablamos?</h2>
                        <p>La forma más rápida de reservar y resolver cualquier duda. Sin formularios, sin esperas.</p>
                    </div>
                    <div className="home-wa-cta__buttons">
                        <Button href={WA_GENERAL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            Escribir por WhatsApp
                        </Button>
                        <Button href="tel:684657760" variant="outline" size="lg">
                            Llamar ahora
                        </Button>
                    </div>
                </div>
            </section>

            {/* ── SERVICIOS ──────────────────────────────────────────────── */}
            <section className="section home-servicios">
                <div className="container">
                    <header className="section-header">
                        <h2>Todo lo que ofrecemos</h2>
                        <p>Cumpleaños, juego libre, fiestas privadas y más</p>
                        <div className="divider" />
                    </header>
                    <div className="home-servicios__grid">
                        {SERVICIOS.map((s) => (
                            <Link key={s.to} to={s.to} className={`home-servicio-card home-servicio-card--${s.color}`}>
                                <span className="home-servicio-card__icon">{s.icon}</span>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <span className="home-servicio-card__cta">{s.cta}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── HORARIOS ───────────────────────────────────────────────── */}
            <section
                className="section home-horarios"
                style={{ backgroundImage: `url(${import.meta.env.BASE_URL}fondo_horario.jpg)` }}
            >
                <div className="container">
                    <header className="section-header home-horarios__header">
                        <h2>Horario de apertura</h2>
                        <div className="divider" />
                    </header>
                    <div className="home-horarios__table">
                        {HORARIOS.map((h) => (
                            <div
                                key={h.dia}
                                className={`home-horario-row${h.hora.includes('Cerrado') ? ' home-horario-row--closed' : ''}`}
                            >
                                <span>{h.dia}</span>
                                <span>{h.hora}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VÍDEO CUMPLEAÑOS ───────────────────────────────────────── */}
            <section className="section home-video-cumple">
                <div className="container">
                    <header className="section-header">
                        <h2>Un cumpleaños en Indiana Bill</h2>
                        <p>Así viven los peques su gran día en Gijón</p>
                        <div className="divider" />
                    </header>
                    <div className="home-video-cumple__frame">
                        <video
                            className="home-video-cumple__video"
                            src={`${BASE}video/cumple.mp4`}
                            poster={`${BASE}video/cumple.jpg`}
                            controls
                            playsInline
                            preload="none"
                            aria-label="Vídeo de un cumpleaños infantil en Indiana Bill Gijón"
                        />
                    </div>
                </div>
            </section>

            {/* ── ASÍ ES INDIANA BILL — GALERÍA ─────────────────────────────── */}
            <section className="section home-galeria">
                <div className="container">
                    <header className="section-header">
                        <h2>Así es Indiana Bill</h2>
                        <p>Más de 1.300 m² de diversión cubierta en el centro de Gijón</p>
                        <div className="divider" />
                    </header>
                    <div className="home-galeria__grid">
                        <img src={`${BASE}img/bolas.jpg`} alt="Parque de bolas de Indiana Bill Gijón" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                        <img src={`${BASE}img/hinchables.jpg`} alt="Hinchables en Indiana Bill Gijón" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                        <img src={`${BASE}img/mesa-cumple.jpg`} alt="Cumpleaños preparado con mesa decorada en Indiana Bill" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                        <img src={`${BASE}img/zona-pequenos.jpg`} alt="Zona de juego para los más pequeños" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                        <img src={`${BASE}img/futbol.jpg`} alt="Pista de fútbol techada en Indiana Bill Gijón" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                        <img src={`${BASE}img/comedor.jpg`} alt="Comedor y zona de celebración" className="home-galeria__img" loading="lazy" width="1280" height="720" />
                    </div>
                </div>
            </section>

            {/* ── OPINIONES ──────────────────────────────────────────────── */}
            <section className="section home-opiniones">
                <div className="container">
                    <header className="section-header">
                        <h2>Lo que dicen las familias</h2>
                        <p>Más de 1.000 cumpleaños celebrados al año en Indiana Bill Gijón</p>
                        <div className="divider" />
                    </header>
                    <div className="home-opiniones__grid">
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars"></div>
                            <p>"Lo mejor fue ver a mi hijo tan feliz. El personal fue increíble y los niños no querían irse. Lo repetiríamos mil veces."</p>
                            <span>— María G., cumpleaños de 5 años</span>
                        </div>
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars"></div>
                            <p>"Nos organizaron todo sin que tuviéramos que preocuparnos de nada. El parque es enorme y los niños se lo pasaron genial."</p>
                            <span>— Carlos M., cumpleaños de 7 años</span>
                        </div>
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars"></div>
                            <p>"Llevamos 3 años celebrando el cumpleaños de nuestra hija aquí. No cambiaríamos Indiana Bill por nada. Los monitores son fantásticos."</p>
                            <span>— Laura P., cumpleaños de 9 años</span>
                        </div>
                    </div>
                    <div className="home-opiniones__cta">
                        <a
                            href="https://www.google.com/maps/search/Indiana+Bill+Gijón"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="home-opiniones__google-btn"
                        >
                             Ver todas las opiniones en Google
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FAQ ────────────────────────────────────────────────────── */}
            <section className="section home-faq" id="preguntas-frecuentes">
                <div className="container">
                    <header className="section-header">
                        <h2>Preguntas frecuentes</h2>
                        <p>Todo lo que necesitas saber antes de reservar</p>
                        <div className="divider" />
                    </header>
                    <FAQAccordion items={faq} />
                </div>
            </section>

            {/* ── CTA FINAL ──────────────────────────────────────────────── */}
            <section className="home-cta">
                <div className="container home-cta__inner">
                    <div>
                        <h2>¿Quieres celebrar un cumpleaños inolvidable en Gijón?</h2>
                        <p>Consulta disponibilidad ahora. Las fechas se agotan rápido.</p>
                    </div>
                    <div className="home-cta__buttons">
                        <Button href={WA_GENERAL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            WhatsApp
                        </Button>
                        <Button href="/cumpleanos" variant="outline" size="lg">
                            Reservar
                        </Button>
                        <Button href="tel:684657760" variant="ghost" size="lg">
                            Llamar
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
