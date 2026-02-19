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

    return (
        <>
            {/* ── HERO ─────────────────────────────────────────────────── */}
            <HeroSection />

            {/* ── DESCRIPTION ───────────────────────────────────────────── */}
            <section className="section home-description">
                <div className="container">
                    <div className="home-description__content">
                        <p>
                            En el Indiana Bill de Gijón encontrarás todo lo que necesitas para divertirte. Celebraciones de cumpleaños o eventos especiales para adultos en un local de más de 1300 metros cuadrados situado en el centro de la ciudad. Toboganes, parque de bolas, pista de fútbol, cafetería o comedor…
                        </p>
                        <p>
                            Todo lo que buscas para tener un recuerdo inolvidable, está aquí.
                        </p>
                    </div>
                </div>
            </section>

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

            {/* ── SERVICIOS ────────────────────────────────────────────── */}
            <section className="section home-services" id="servicios">
                <div className="container">
                    <header className="section-header">
                        <h2>Servicios y precios</h2>
                        <p>Todo lo que necesitas para celebrarlo a lo grande</p>
                        <div className="divider" />
                    </header>
                    <div className="grid-4">
                        {servicios.map((s) => (
                            <ServiceCard key={s.id} {...s} />
                        ))}
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
