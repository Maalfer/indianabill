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
                    <FAQAccordion items={faq} />
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
        </>
    )
}
