import { useEffect, useState } from 'react'
import Button from '../components/Button'
import './LocalizacionPage.css'

export default function LocalizacionPage() {
    return (
        <>
            {/* Page header */}
            <div className="localizacion-hero">
                <div className="container">
                    <span className="localizacion-hero__badge">📍 Estamos aquí</span>
                    <h1>Localización</h1>
                    <p>Al encontrarnos en un lugar muy céntrico de Gijón hay muchas formas de llegar a nuestro local</p>
                </div>
            </div>

            {/* Main content */}
            <section className="section localizacion-intro">
                <div className="container">
                    <div className="localizacion-intro__content">
                        <h2>¿Dónde está Indiana Bill?</h2>
                        <p>
                            Nos encontramos en el corazón de Gijón, en una ubicación perfectamente conectada 
                            y fácil de acceder tanto en transporte público como en coche privado.
                        </p>
                    </div>
                </div>
            </section>

            {/* Parking */}
            <section className="section localizacion-parking">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Dónde aparcar cerca de Indiana Bill?</h2>
                        <p>Opciones de aparcamiento cercanas</p>
                        <div className="divider" />
                    </header>

                    <div className="parking-options">

                        <div className="parking-card">
                            <div className="parking-card__header">
                                <span className="parking-card__icon">🚗</span>
                                <h3>Alrededores</h3>
                                <span className="parking-card__distance">Zona azul</span>
                            </div>
                            <div className="parking-card__content">
                                <p>
                                    Busca sitio para aparcar en nuestros alrededores 
                                    en la zona de aparcamiento regulado.
                                </p>
                            </div>
                        </div>
                        <div className="parking-card featured">
                            <div className="parking-card__header">
                                <span className="parking-card__icon">♿</span>
                                <h3>Plaza para discapacitados</h3>
                                <span className="parking-card__distance">1 minuto andando</span>
                            </div>
                            <div className="parking-card__content">
                                <p>
                                    Si lo necesitas, también disponemos de una plaza para discapacitados a 1 minuto del local.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bus */}
            <section className="section localizacion-bus">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué buses llegan hasta Indiana Bill? 🚌</h2>
                        <p>Si vienes en bus no te preocupes, ¡las paradas están a solo 3 minutos andando!</p>
                        <div className="divider" />
                    </header>

                    <div className="bus-stops">
                        <div className="bus-stop">
                            <div className="bus-stop__header">
                                <span className="bus-stop__icon">🚏</span>
                                <h3>Parada de bus Llaranes</h3>
                            </div>
                            <div className="bus-stop__lines">
                                <h4>Líneas que pasan por aquí:</h4>
                                <div className="bus-lines">
                                    <span className="bus-line">Línea 15</span>
                                    <span className="bus-line">Línea 6</span>
                                    <span className="bus-line">Línea Búho 2</span>
                                </div>
                            </div>
                        </div>

                        <div className="bus-stop">
                            <div className="bus-stop__header">
                                <span className="bus-stop__icon">🚏</span>
                                <h3>Parada de bus Severo Ochoa (Rey Pelayo)</h3>
                            </div>
                            <div className="bus-stop__lines">
                                <h4>Líneas que pasan por aquí:</h4>
                                <div className="bus-lines">
                                    <span className="bus-line">Línea 10</span>
                                    <span className="bus-line">Línea Búho 2</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="section localizacion-mapa">
                <div className="container">
                    <header className="section-header">
                        <h2>Encuéntranos en el mapa</h2>
                        <p>Ubicación exacta de Indiana Bill Gijón</p>
                        <div className="divider" />
                    </header>

                    <div className="map-container">
                        
                        <div className="map-info">
                            <h3>Indiana Bill Gijón</h3>
                            <p>Calle Principal, 123</p>
                            <p>33201 Gijón, Asturias</p>
                            <div className="map-iframe-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1446.2634612041481!2d-5.668274392070994!3d43.533056997928995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd367c8ad39fcc63%3A0x74b8b98e4226259c!2sIndiana+Bill+Gij%C3%B3n!5e0!3m2!1ses!2ses!4v1539452001187"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Mapa de Indiana Bill Gijón"
                                className="map-iframe"
                            ></iframe>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="section localizacion-cta">
                <div className="container">
                    <div className="localizacion-cta__content">
                        <div>
                            <h2>¿Necesitas ayuda para llegar?</h2>
                            <p>No dudes en contactarnos si tienes alguna duda sobre cómo encontrarnos</p>
                        </div>
                        <div className="cta-buttons">
                            <Button
                                href="tel:985374167"
                                variant="secondary"
                                size="lg"
                            >
                                📞 Llamar ahora
                            </Button>
                            <Button
                                href="https://api.whatsapp.com/send?phone=34684657760&text=%C2%A1Hola!%20Tengo%20una%20duda%20sobre%20c%C3%B3mo%20llegar%20a%20Indiana%20Bill%20Gij%C3%B3n%20%F0%9F%97%BA%EF%B8%8F"
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="primary"
                                size="lg"
                            >
                                💬 WhatsApp
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
