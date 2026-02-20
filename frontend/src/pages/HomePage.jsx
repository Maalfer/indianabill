import { useEffect, useState } from 'react'
import HeroSection from '../components/HeroSection'
import ServiceCard from '../components/ServiceCard'
import PartyCard from '../components/PartyCard'
import FAQAccordion from '../components/FAQAccordion'
import Button from '../components/Button'
import './HomePage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function HomePage() {
    const [servicios, setServicios] = useState([])
    const [faq, setFaq] = useState([])
    const [horario, setHorario] = useState(null)
    const [expandedItems, setExpandedItems] = useState({})

    useEffect(() => {
        fetch(`${API}/api/servicios`)
            .then((r) => r.json())
            .then(setServicios)
            .catch(() => { })

        fetch(`${API}/api/faq`)
            .then((r) => r.json())
            .then((d) => setFaq(d.items))
            .catch(() => { })

        fetch(`${API}/api/horario`)
            .then((r) => r.json())
            .then(setHorario)
            .catch(() => { })
    }, [])

    const toggleItem = (index) => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <>
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <HeroSection />



            {/* ── PARTY CARDS ───────────────────────────────────────────── */}
            <section className="section home-party-cards">
                <div className="container">
                    <div className="party-cards-grid">
                        <PartyCard
                            title="Cumpleaños Infantiles"
                            overlayColor="blue"
                            buttonText="Clic para saber más"
                            buttonHref="/servicios"
                            backgroundImage="/fondo.jpg"
                        />
                        <PartyCard
                            title="Fiestas para adultos"
                            overlayColor="red"
                            buttonText="Clic para saber más"
                            buttonHref="/servicios"
                            backgroundImage="/fondo.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* ── YOUTUBE VIDEO ─────────────────────────────────────────── */}
            <section className="section home-video">
                <div className="container">
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/llKb4NkS2tU"
                            title="Indiana Bill Gijón Video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-iframe"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* ── WHATSAPP CARD ROW ─────────────────────────────────────── */}
            <section className="section home-whatsapp-card">
                <div className="container">
                    <div className="party-cards-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <PartyCard
                            title="¿Tienes dudas? Háblanos por Whastapp"
                            overlayColor="green"
                            buttonText="Clic para escribirnos"
                            buttonHref="https://wa.me/34984000000"
                            backgroundImage="/fondo.jpg"
                            className="party-card--banner"
                        />
                    </div>
                </div>
            </section>

            {/* ── YOUTUBE VIDEO 2 ─────────────────────────────────────────── */}
            <section className="section home-video">
                <div className="container">
                    <div className="video-container">
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/NYVRp3fPTeY"
                            title="Indiana Bill Video Promocional"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-iframe"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* ── PREGUNTAS FRECUENTES ─────────────────────────────────────────── */}
            <section className="section home-faq" id="preguntas-frecuentes">
                <div className="container">
                    <header className="section-header">
                        <h2>Preguntas Frecuentes</h2>
                        <p>Todo lo que necesitas saber sobre nuestras fiestas y servicios</p>
                        <div className="divider" />
                    </header>
                    <div className="faq-grid">
                        <div className={`faq-item ${expandedItems[0] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(0)}>
                                <h3>¿Cómo se reserva?</h3>
                                <span className="faq-icon">{expandedItems[0] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[0] ? 'show' : ''}`}>
                                <p>Por la actual situación, solo se podrá reservar por una vía y es llamando por teléfono al <strong>985 37 41 67</strong> o <strong>684 65 77 60</strong> enviando un WhatsApp a dicho número. Se deberá dejar un depósito de 20€ para formalizar la fecha de celebración de la fiesta, que se devolverá una vez se haga el pago final.</p>
                                <p><em>De momento no reservamos vía email, ni vía redes sociales.</em></p>
                            </div>
                        </div>

                        <div className={`faq-item ${expandedItems[1] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(1)}>
                                <h3>¿Qué edades pueden venir a jugar? (niños)</h3>
                                <span className="faq-icon">{expandedItems[1] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[1] ? 'show' : ''}`}>
                                <p>Las edades comprendidas oscilan entre los <strong>0 y 12 años</strong>. Tenemos una zona de juego para niños de 0 a 4 y otra de 5 a 12.</p>
                                <p>Los niños de 0 a 4 años, pueden jugar en la zona para mayores firmando un permiso que facilitará la ludoteca infantil.</p>
                            </div>
                        </div>

                        <div className={`faq-item ${expandedItems[2] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(2)}>
                                <h3>¿Hay menús para alérgenos o especiales además de los principales?</h3>
                                <span className="faq-icon">{expandedItems[2] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[2] ? 'show' : ''}`}>
                                <p>Poseemos varios menús a parte de los principales. Échale una ojeada a la sección «servicios» y «cumpleaños niños». Ahí, especificaremos todo un poco más a fondo.</p>
                                <p>Si se necesita algo en especial que no se muestre, estamos abiertos a buscar la mejor solución para las familias. Así que, no dudéis en comentar con nosotros cualquier necesidad o sugerencia que tengáis.</p>
                            </div>
                        </div>

                        <div className={`faq-item ${expandedItems[3] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(3)}>
                                <h3>¿Hay mínimo o máximo requerido para hacer una reserva?</h3>
                                <span className="faq-icon">{expandedItems[3] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[3] ? 'show' : ''}`}>
                                <p><strong>No hay mínimo ni máximo.</strong> Para celebrar tu fiesta solo hacen falta ganas de pasárselo bien.</p>
                            </div>
                        </div>

                        <div className={`faq-item ${expandedItems[4] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(4)}>
                                <h3>¿Es seguro venir a jugar y celebrar?</h3>
                                <span className="faq-icon">{expandedItems[4] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[4] ? 'show' : ''}`}>
                                <p>Seguimos <strong>todas las normas de seguridad y prevención recomendadas a rajatabla</strong>, con el fin de dar la mayor tranquilidad y seguridad.</p>
                                <p>Se siguen los protocolos de limpieza después de cada fiesta y el local ha sido revisado por profesionales del sector durante la desescalada, con el fin de eliminar cualquier agente contaminante previo.</p>
                            </div>
                        </div>

                        <div className={`faq-item ${expandedItems[5] ? 'expanded' : ''}`}>
                            <div className="faq-question" onClick={() => toggleItem(5)}>
                                <h3>¿Qué incluye la celebración de cumpleaños?</h3>
                                <span className="faq-icon">{expandedItems[5] ? '−' : '+'}</span>
                            </div>
                            <div className={`faq-answer ${expandedItems[5] ? 'show' : ''}`}>
                                <p>Nuestras celebraciones de cumpleaños incluyen <strong>acceso a todas las instalaciones</strong>, monitor especializado, música ambientada, y opciones de menús adaptados a todas las edades y necesidades alimenticias.</p>
                                <p>También disponemos de packs adicionales como decoración temática, animación y fotografía profesional para hacer tu fiesta aún más especial.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HORARIO ──────────────────────────────────────────────── */}
            {horario && (
                <section className="section home-schedule">
                    <div className="container">
                        <header className="section-header">
                            <h2>Horario</h2>
                            <p>{horario.nota}</p>
                            <div className="divider" />
                        </header>
                        <div className="schedule-grid">
                            {horario.horario.map((d) => (
                                <div
                                    key={d.dia}
                                    className={`schedule-card${d.abierto ? '' : ' schedule-card--closed'}`}
                                >
                                    <span className="schedule-card__day">{d.dia}</span>
                                    {d.abierto ? (
                                        <span className="schedule-card__hours">
                                            {d.apertura} – {d.cierre}
                                        </span>
                                    ) : (
                                        <span className="schedule-card__hours schedule-card__hours--closed">
                                            Cerrado
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA WHATSAPP ─────────────────────────────────────────── */}
            <section className="home-cta">
                <div className="container home-cta__inner">
                    <div>
                        <h2>¿Tienes dudas? ¡Escríbenos!</h2>
                        <p>Estamos disponibles para resolver cualquier pregunta sobre reservas y precios.</p>
                    </div>
                    <Button
                        href="https://wa.me/34984000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="ghost"
                        size="lg"
                    >
                        💬 Háblanos por WhatsApp
                    </Button>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────────────── */}
            <section className="section" id="faq">
                <div className="container">
                    <header className="section-header">
                        <h2>Preguntas frecuentes</h2>
                        <p>Resolvemos las dudas más habituales</p>
                        <div className="divider" />
                    </header>
                    <FAQAccordion items={faq} />
                </div>
            </section>
        </>
    )
}
