import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import FAQAccordion from '../components/FAQAccordion'
import Button from '../components/Button'
import LeadForm from '../components/LeadForm'
import './HomePage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

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
    { num: '1', title: 'Elige la fecha', desc: 'Rellena el formulario o escríbenos con la fecha que quieres.' },
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

    return (
        <>
            <HeroSection />

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
                        <div className="home-precio-card">
                            <h3>Menú Indy</h3>
                            <div className="home-precio-row">
                                <span>Entre semana</span>
                                <strong>Ver menú</strong>
                            </div>
                            <div className="home-precio-row">
                                <span>Fin de semana</span>
                                <strong>Ver menú</strong>
                            </div>
                        </div>
                        <div className="home-precio-card home-precio-card--featured">
                            <span className="home-precio-card__tag">Más completo</span>
                            <h3>Menú Super Indy</h3>
                            <div className="home-precio-row">
                                <span>Entre semana</span>
                                <strong>Ver menú</strong>
                            </div>
                            <div className="home-precio-row">
                                <span>Fin de semana</span>
                                <strong>Ver menú</strong>
                            </div>
                        </div>
                    </div>
                    <div className="home-precios__cta">
                        <Button href="/cumpleanos#menus" variant="primary" size="lg">
                            Ver menús completos y precios exactos
                        </Button>
                        <p className="home-precios__note">Mínimo 8 niños. Precio incluye parque ilimitado durante la celebración.</p>
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

            {/* ── FORMULARIO CAPTACIÓN ────────────────────────────────────── */}
            <section className="home-form-section">
                <div className="container">
                    <div className="home-form-section__header">
                        <h2>Consulta disponibilidad ahora</h2>
                        <p>Rellena el formulario y te respondemos en menos de 24 horas. Sin compromiso.</p>
                    </div>
                    <div className="home-form-section__inner">
                        <LeadForm servicio="cumpleanos" compact={false} />
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

            {/* ── VIDEOS CORTOS ──────────────────────────────────────────── */}
            <section className="section home-shorts">
                <div className="container">
                    <div className="home-shorts__grid">
                        <video className="short-video" src="https://www.indianabilldegijon.es/wp-content/uploads/2020/10/48789635_117694950095221_3144007622461847823_n.mp4" autoPlay muted loop playsInline preload="metadata" />
                        <video className="short-video" src="https://www.indianabilldegijon.es/wp-content/uploads/2020/10/47354649_130731465055010_849112413659951726_n.mp4" autoPlay muted loop playsInline preload="metadata" />
                        <video className="short-video" src="https://www.indianabilldegijon.es/wp-content/uploads/2020/10/107696883_774992853242507_1686557807320756955_n.mp4" autoPlay muted loop playsInline preload="metadata" />
                    </div>
                </div>
            </section>

            {/* ── OPINIONES ──────────────────────────────────────────────── */}
            <section className="section home-opiniones">
                <div className="container">
                    <header className="section-header">
                        <h2>Lo que dicen las familias</h2>
                        <p>Más de 500 cumpleaños celebrados en Indiana Bill Gijón</p>
                        <div className="divider" />
                    </header>
                    <div className="home-opiniones__grid">
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars">⭐⭐⭐⭐⭐</div>
                            <p>"Lo mejor fue ver a mi hijo tan feliz. El personal fue increíble y los niños no querían irse. Lo repetiríamos mil veces."</p>
                            <span>— María G., cumpleaños de 5 años</span>
                        </div>
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars">⭐⭐⭐⭐⭐</div>
                            <p>"Nos organizaron todo sin que tuviéramos que preocuparnos de nada. El parque es enorme y los niños se lo pasaron genial."</p>
                            <span>— Carlos M., cumpleaños de 7 años</span>
                        </div>
                        <div className="home-opinion-card">
                            <div className="home-opinion-card__stars">⭐⭐⭐⭐⭐</div>
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
                            <span>★</span> Ver todas las opiniones en Google
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
                            💬 WhatsApp
                        </Button>
                        <Button href="/cumpleanos" variant="outline" size="lg">
                            🎂 Reservar
                        </Button>
                        <Button href="tel:684657760" variant="ghost" size="lg">
                            📞 Llamar
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
