import { useEffect, useState } from 'react'
import Button from '../components/Button'
import './AdultosPage.css'

export default function AdultosPage() {
    return (
        <>
            {/* Page header */}
            <div className="adultos-hero">
                <div className="container">
                    <span className="adultos-hero__badge">🎉 Fiestas para todos</span>
                    <h1>Adolescentes y adultos</h1>
                    <p>Disfruta de la ludoteca más grande de Asturias con tus amigos</p>
                </div>
            </div>

            {/* Main content */}
            <section className="section adultos-intro">
                <div className="container">
                    <div className="adultos-intro__content">
                        <h2>Juega con tus amigos en el Indiana Bill de Gijón</h2>
                        <p>
                            Disfrutad de la ludoteca más grande de Asturias, de sus toboganes, hinchables y cancha de fútbol, 
                            pero ahora, ¡sin ser un niño!
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

            {/* Options */}
            <section className="section adultos-opciones">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué opciones tengo?</h2>
                        <p>Elige la que mejor se adapte a tu grupo</p>
                        <div className="divider" />
                    </header>

                    <div className="opciones-grid">
                        <div className="opcion-card">
                            <div className="opcion-card__header">
                                <span className="opcion-card__icon">⏰</span>
                                <h3>Opción por horas</h3>
                                <span className="opcion-card__price">8€/hora por persona</span>
                            </div>
                            <div className="opcion-card__content">
                                <h4>Requisitos:</h4>
                                <ul className="opcion-card__requirements">
                                    <li>Reserva previa necesaria</li>
                                    <li>Mínimo 8 amigos que tengan ganas de jugar</li>
                                    <li>Mínimo 2 horas por persona</li>
                                </ul>
                            </div>
                        </div>

                        <div className="opcion-card featured">
                            <div className="opcion-card__header">
                                <span className="opcion-card__icon">🍽️</span>
                                <h3>Opción completa</h3>
                                <span className="opcion-card__price">25€ por persona</span>
                            </div>
                            <div className="opcion-card__content">
                                <h4>Requisitos:</h4>
                                <ul className="opcion-card__requirements">
                                    <li>Reserva previa necesaria</li>
                                    <li>Mínimo 8 amigos que tengan ganas de jugar</li>
                                    <li>3 horas de juego + comida</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Schedule */}
            <section className="section adultos-horario">
                <div className="container">
                    <header className="section-header">
                        <h2>Horario</h2>
                        <div className="divider" />
                    </header>

                    <div className="horario-card">
                        <div className="horario-item">
                            <span className="horario-day">Opción completa</span>
                            <span className="horario-time">13h a 16h (juego + comida)</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Solo juegos</span>
                            <span className="horario-time">14:00 a 16:00 (solo juegos)</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* How to reserve */}
            <section className="section adultos-reserva">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo reservar?</h2>
                        <p>Reservar tu fiesta para adultos es muy sencillo</p>
                        <div className="divider" />
                    </header>

                    <div className="reserva-steps">
                        <div className="reserva-step">
                            <div className="reserva-step__number">1</div>
                            <div className="reserva-step__content">
                                <h3>Contacta con nosotros</h3>
                                <p>Llama o envía un WhatsApp para consultar disponibilidad</p>
                            </div>
                        </div>

                        <div className="reserva-step">
                            <div className="reserva-step__number">2</div>
                            <div className="reserva-step__content">
                                <h3>Confirma el grupo</h3>
                                <p>Mínimo 8 personas para poder realizar la reserva</p>
                            </div>
                        </div>

                        <div className="reserva-step">
                            <div className="reserva-step__number">3</div>
                            <div className="reserva-step__content">
                                <h3>Realiza el pago</h3>
                                <p>Depósito del importe de las 8 personas como mínimo</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-info">
                        <h3>Para reservar llama a:</h3>
                        <div className="contact-numbers">
                            <a href="tel:985374167" className="contact-number">985 374 167</a>
                            <span>o</span>
                            <a href="tel:684657760" className="contact-number">684 657 760</a>
                        </div>
                        <p className="payment-note">
                            Como os hemos dicho, deberéis reservar para mínimo 8 personas. 
                            Se os facilitará una cuenta bancaria en la que tendréis que depositar el importe de al menos, 
                            esas 8 personas. Si posteriormente, sois más de 8, se deberá abonar en el local 
                            la diferencia antes de entrar a jugar.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section adultos-cta">
                <div className="container">
                    <div className="adultos-cta__content">
                        <div>
                            <h2>¿Tienes dudas? ¡Háblanos por WhatsApp!</h2>
                            <p>Estamos disponibles para resolver cualquier pregunta sobre fiestas para adultos</p>
                        </div>
                        <Button
                            href="https://api.whatsapp.com/send?phone=34684657760&text=%C2%A1Hola!%20Quiero%20informaci%C3%B3n%20para%20organizar%20una%20fiesta%20para%20adultos%20en%20Indiana%20Bill%20Gij%C3%B3n%20%F0%9F%8E%89.%20%C2%BFQu%C3%A9%20opciones%20ten%C3%A9is%3F"
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
