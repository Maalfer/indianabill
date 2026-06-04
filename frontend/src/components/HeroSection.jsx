import Button from './Button'
import './HeroSection.css'

const BASE = import.meta.env.BASE_URL

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20consultar%20disponibilidad%20para%20un%20cumplea%C3%B1os%20en%20Indiana%20Bill%20Gij%C3%B3n%20%F0%9F%8E%82'

export default function HeroSection() {
    return (
        <section className="hero">
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />

            <div className="container hero__layout">
                {/* Texto principal */}
                <div className="hero__content">
                    <span className="hero__badge">Parque infantil cubierto en el centro de Gijón</span>

                    <h1 className="hero__heading">
                        Cumpleaños infantiles{' '}
                        <span className="hero__heading-accent">inolvidables</span>{' '}
                        en Gijón
                    </h1>

                    <p className="hero__sub">
                        Más de <strong>4 horas reales de diversión</strong> sin preocupaciones.
                        Nos encargamos de todo para que los peques disfruten y los padres descansen.
                    </p>
                    <p className="hero__sub hero__sub--small">
                        Parque cubierto de 1.300 m² · Merienda · Tarta · Monitores · Hinchables · Piscina de bolas
                    </p>

                    <div className="hero__actions">
                        <Button href="/cumpleanos" variant="primary" size="lg">
                            Reservar cumpleaños
                        </Button>
                        <Button href="/cumpleanos#precios" variant="outline" size="lg">
                            Ver precios
                        </Button>
                        <a href={WA} target="_blank" rel="noopener noreferrer" className="hero__wa-btn">
                            WhatsApp
                        </a>
                    </div>

                    <div className="hero__trust">
                        <div className="hero__trust-item">
                            
                            <span>+1.000 cumpleaños al año</span>
                        </div>
                        <div className="hero__trust-item">
                            
                            <span>Centro de Gijón</span>
                        </div>
                        <div className="hero__trust-item">
                            
                            <span>Espacio privado y cubierto</span>
                        </div>
                    </div>
                </div>

                {/* Vídeo principal del parque — primera impresión del local */}
                <div className="hero__photo-area">
                    <video
                        className="hero__photo-img hero__photo-video"
                        src={`${BASE}video/hero.mp4`}
                        poster={`${BASE}video/hero.jpg`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label="Vídeo del parque Indiana Bill Gijón: amplitud, zonas de juego y ambiente"
                    />
                </div>
            </div>
        </section>
    )
}
