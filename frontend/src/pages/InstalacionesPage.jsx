import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './InstalacionesPage.css'

const ZONAS = [
    { icon: '⚽', title: 'Cancha de fútbol', desc: 'Pista techada para partidos entre amigos o durante las celebraciones' },
    { icon: '🎈', title: 'Hinchables', desc: 'Castillos y estructuras hinchables para los más pequeños' },
    { icon: '🛝', title: 'Toboganes', desc: 'Toboganes de diferentes alturas y velocidades para todas las edades' },
    { icon: '🎱', title: 'Parque de bolas', desc: 'El clásico parque de bolas gigante, el corazón del Indiana Bill' },
    { icon: '👶', title: 'Zona pequeños', desc: 'Área segura y adaptada para bebés y niños de hasta 4 años' },
    { icon: '🧒', title: 'Zona grandes', desc: 'Espacio diseñado para niños de 4 a 12 años con más emociones' },
    { icon: '☕', title: 'Cafetería', desc: 'Cafetería para que los adultos descansen mientras los niños juegan' },
    { icon: '🍽️', title: 'Comedor', desc: 'Comedor para celebraciones y fiestas privadas con catering incluido' },
]

export default function InstalacionesPage() {
    return (
        <>
            <div className="instalaciones-hero">
                <div className="container">
                    <span className="instalaciones-hero__badge">🏟️ Más de 1.300 m²</span>
                    <h1>Nuestras instalaciones</h1>
                    <p>El parque infantil cubierto más grande de Asturias. Descubre todo lo que tenemos para ti.</p>
                </div>
            </div>

            {/* Intro */}
            <section className="section">
                <div className="container">
                    <div className="instalaciones-intro">
                        <div className="instalaciones-intro__stat">
                            <span className="instalaciones-intro__stat-num">1.300</span>
                            <span className="instalaciones-intro__stat-label">m² de parque cubierto</span>
                        </div>
                        <div className="instalaciones-intro__text">
                            <h2>Un espacio enorme para la diversión</h2>
                            <p>
                                Indiana Bill cuenta con más de <strong>1.300 metros cuadrados</strong> de instalaciones
                                cubiertas en el centro de Gijón. Un espacio diseñado para que niños de 0 a 12 años
                                disfruten al máximo, sea cual sea el tiempo.
                            </p>
                            <p>
                                Toboganes, hinchables, parque de bolas, cancha de fútbol, zona para pequeños,
                                cafetería y comedor. Todo en un mismo sitio, limpio, seguro y con personal presente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Zonas */}
            <section className="section instalaciones-zonas">
                <div className="container">
                    <header className="section-header">
                        <h2>Zonas y espacios</h2>
                        <p>Todo lo que encontrarás dentro del parque</p>
                        <div className="divider" />
                    </header>
                    <div className="instalaciones-zonas__grid">
                        {ZONAS.map((z) => (
                            <div key={z.title} className="instalaciones-zona-card">
                                <span className="instalaciones-zona-card__icon">{z.icon}</span>
                                <h3>{z.title}</h3>
                                <p>{z.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video */}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>Míralo por dentro</h2>
                        <p>Un tour por las instalaciones de Indiana Bill Gijón</p>
                        <div className="divider" />
                    </header>
                    <div className="instalaciones-video">
                        <iframe
                            width="100%"
                            height="500"
                            src="https://www.youtube.com/embed/llKb4NkS2tU"
                            title="Indiana Bill Gijón — Tour instalaciones"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="video-iframe"
                        />
                    </div>
                </div>
            </section>

            {/* CTAs finales */}
            <section className="section instalaciones-ctas">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué quieres hacer en Indiana Bill?</h2>
                        <div className="divider" />
                    </header>
                    <div className="instalaciones-ctas__grid">
                        <Link to="/cumpleanos" className="instalaciones-cta-card instalaciones-cta-card--green">
                            <span>🎂</span>
                            <h3>Celebrar un cumpleaños infantil</h3>
                            <p>Ver menús, precios y disponibilidad</p>
                        </Link>
                        <Link to="/juego-libre" className="instalaciones-cta-card instalaciones-cta-card--blue">
                            <span>🎮</span>
                            <h3>Venir a jugar</h3>
                            <p>Ver horarios y precios de juego libre</p>
                        </Link>
                        <Link to="/fiestas-privadas" className="instalaciones-cta-card instalaciones-cta-card--red">
                            <span>🎉</span>
                            <h3>Organizar una fiesta privada</h3>
                            <p>Adultos, despedidas, grupos y más</p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}
