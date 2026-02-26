import { useEffect, useState } from 'react'
import Button from '../components/Button'
import './CumpleanosPage.css'

export default function CumpleanosPage() {
    const [expandedSection, setExpandedSection] = useState(null)

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section)
    }

    return (
        <>
            {/* Page header */}
            <div className="cumpleanos-hero">
                <div className="container">
                    <span className="cumpleanos-hero__badge">🎂 Los mejores cumpleaños</span>
                    <h1>Cumpleaños para niños</h1>
                    <p>Menús, precios y toda la información para celebrar el mejor cumpleaños en Gijón</p>
                </div>
            </div>

            {/* Main content */}
            <section className="section cumpleanos-intro">
                <div className="container">
                    <div className="cumpleanos-intro__content">
                        <p>
                            Si quieres celebrar un cumpleaños para niños estás en el lugar adecuado. 
                            Aquí te enseñaremos los distintos menús y precios de cumpleaños que tenemos en el Indiana Bill de Gijón.
                            Además, te mostraremos como debes formalizar la reserva y algunas de las dudas más frecuentes que se suelen tener.
                            Después de esto, estamos seguros de que sabrás donde celebrar tu cumpleaños en Gijón. ¡Allá vamos!
                        </p>
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

            {/* How to reserve */}
            <section className="section cumpleanos-reserva">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo reservar?</h2>
                        <p>Reservar tu cumpleaños es muy sencillo</p>
                        <div className="divider" />
                    </header>

                    <div className="cumpleanos-reserva__content">
                        <div className="cumpleanos-reserva__steps">
                            <div className="reserva-step">
                                <div className="reserva-step__number">1</div>
                                <div className="reserva-step__content">
                                    <h3>Decide los detalles</h3>
                                    <p>Menú, tarta, número de niños, horario de reserva y fecha</p>
                                </div>
                            </div>

                            <div className="reserva-step">
                                <div className="reserva-step__number">2</div>
                                <div className="reserva-step__content">
                                    <h3>Contacta con nosotros</h3>
                                    <p>Llama o envía un WhatsApp para confirmar disponibilidad</p>
                                </div>
                            </div>

                            <div className="reserva-step">
                                <div className="reserva-step__number">3</div>
                                <div className="reserva-step__content">
                                    <h3>Formaliza la reserva</h3>
                                    <p>Paga por anticipado para oficializar la reserva</p>
                                </div>
                            </div>
                        </div>

                        <div className="cumpleanos-reserva__contact">
                            <h3>Para reservar llama a:</h3>
                            <div className="contact-numbers">
                                <a href="tel:985374167" className="contact-number">985 374 167</a>
                                <span>o</span>
                                <a href="tel:684657760" className="contact-number">684 657 760</a>
                            </div>
                            <p className="contact-note">
                                *Se deberá contactar con el parque vía telefónica o dentro de él. 
                                Esto, quiere decir que vía correo electrónico o redes sociales no se podrá hacer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="section cumpleanos-horario">
                <div className="container">
                    <header className="section-header">
                        <h2>Horario</h2>
                        <div className="divider" />
                    </header>

                    <div className="horario-card">
                        <div className="horario-item">
                            <span className="horario-day">Lunes</span>
                            <span className="horario-time">Cerrado por descanso (excepto vísperas y festivos)</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Martes y Jueves</span>
                            <span className="horario-time">17:00 a 21:00</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Viernes, Sábado y Vísperas</span>
                            <span className="horario-time">17:00 a 21:30</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Domingo y festivos</span>
                            <span className="horario-time">17:00 a 21:00</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menus */}
            <section className="section cumpleanos-menus">
                <div className="container">
                    <header className="section-header">
                        <h2>Menús de cumpleaños para niños</h2>
                        <p>Dentro del precio del menú, viene incluido pasar la tarde en el Indiana Bill de Gijón</p>
                        <div className="divider" />
                    </header>

                    <div className="menus-images">
                        <img src="/menu1.png" alt="Menú de cumpleaños Indy" className="menus-images__img" />
                        <img src="/menu2.png" alt="Menú de cumpleaños Super Indy" className="menus-images__img" />
                    </div>

                    <div className="menu-alergenos">
                        <img src="/menuAlergenos.jpg" alt="Información de alérgenos" className="menu-alergenos__img" />
                    </div>
                </div>
            </section>

            {/* Activities */}
            <section className="section cumpleanos-actividades">
                <div className="container">
                    <header className="section-header">
                        <h2>Actividades incluidas</h2>
                        <p>Se realizarán actividades como globloflexia, torneo de fútbol o pintacaras dentro del Indiana Bill</p>
                        <div className="divider" />
                    </header>

                    <div className="actividades-grid">
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎈</span>
                            <h3>Globloflexia</h3>
                            <p>Diversión con globos y juegos de magia</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">⚽</span>
                            <h3>Torneo de fútbol</h3>
                            <p>Competencias amistosas en nuestra pista techada</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎨</span>
                            <h3>Pintacaras</h3>
                            <p>Creación artística y divertida con pinturas faciales</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎮</span>
                            <h3>Juegos infantiles</h3>
                            <p>Amplia variedad de juegos adaptados a cada edad</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Info */}
            <section className="section cumpleanos-info">
                <div className="container">
                    <header className="section-header">
                        <h2>Preguntas Frecuentes</h2>
                        <div className="divider" />
                    </header>
                    <div className="info-card">
                        <h3>¿Para qué edades?</h3>
                        <p>
                            Nuestra especialidad es celebrar cumpleaños para los más pequeños de la casa. 
                            Los niños y niñas que vienen a jugar a nuestra ludoteca tienen entre 0 y 12 años.
                        </p>
                    </div>

                    <div className="info-card">
                        <h3>¿Es privado?</h3>
                        <p>
                            Sí, al ser una fiesta privada, se otorgaría el local a quien antes lo concrete. 
                            Por eso es importante formalizar la reserva con pago anticipado.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section cumpleanos-cta">
                <div className="container">
                    <div className="cumpleanos-cta__content">
                        <div>
                            <h2>¿Tienes dudas? ¡Háblanos por WhatsApp!</h2>
                            <p>Estamos disponibles para resolver cualquier pregunta sobre reservas y precios</p>
                        </div>
                        <Button
                            href="https://api.whatsapp.com/send?phone=34684657760&text=%C2%A1Hola!%20Me%20interesa%20reservar%20una%20fiesta%20para%20ni%C3%B1os%20en%20Indiana%20Bill%20Gij%C3%B3n%20%F0%9F%8E%88.%20%C2%BFMe%20pod%C3%A9is%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="lg"
                        >
                            💬 Clic para escribirnos
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
