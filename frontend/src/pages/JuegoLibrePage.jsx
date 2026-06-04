import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Seo from '../components/Seo'
import './JuegoLibrePage.css'

const BASE = import.meta.env.BASE_URL

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20tengo%20una%20pregunta%20sobre%20el%20juego%20libre%20en%20Indiana%20Bill%20Gij%C3%B3n'

const HORARIOS = [
    { dia: 'Lunes', hora: 'Cerrado (excepto vísperas y festivos)' },
    { dia: 'Martes y Jueves', hora: '17:00 a 21:00' },
    { dia: 'Miércoles', hora: '17:00 a 21:00' },
    { dia: 'Viernes, Sábado y Vísperas', hora: '17:00 a 21:30' },
    { dia: 'Domingo y Festivos', hora: '17:00 a 21:00' },
]

const NORMAS = [
    'Los niños deben ir con calcetines en todo momento',
    'Los adultos acompañantes permanecen en la zona de cafetería',
    'No se permite introducir comida o bebida exterior',
    'Los niños son responsabilidad de sus padres/tutores',
    'Se respetan los turnos de acceso a las atracciones',
]

export default function JuegoLibrePage() {
    return (
        <>
            <Seo
                title="Juego libre — parque infantil cubierto en Gijón | Indiana Bill"
                description="Ven a jugar sin reserva al parque infantil cubierto de Gijón. Precios desde 1,50€/15 min. Toboganes, hinchables, parque de bolas y pista de fútbol."
                path="/juego-libre"
            />
            <div className="juego-hero">
                <div className="container">
                    <span className="juego-hero__badge">Diversión sin reserva</span>
                    <h1>Juego libre en Indiana Bill</h1>
                    <p>Ven cuando quieras, juega el tiempo que necesites. Horarios, precios y todo lo que debes saber.</p>
                    <div className="juego-hero__ctas">
                        <Button href="#precios" variant="primary" size="lg">
                            Ver precios y horarios
                        </Button>
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
                            WhatsApp
                        </Button>
                    </div>
                </div>
            </div>

            {/* FOTO STRIP — niños jugando */}
            <div className="juego-photo-strip">
                <img src={`${BASE}img/bolas2.jpg`} alt="Niños jugando en el parque de bolas" className="juego-photo-strip__img" loading="lazy" width="1280" height="720" />
                <img src={`${BASE}img/toboganes2.jpg`} alt="Toboganes e hinchables en acción" className="juego-photo-strip__img" loading="lazy" width="1280" height="720" />
                <img src={`${BASE}img/futbol2.jpg`} alt="Pista de fútbol techada en Indiana Bill" className="juego-photo-strip__img" loading="lazy" width="1280" height="720" />
            </div>

            {/* Precios */}
            <section className="section juego-precios" id="precios">
                <div className="container">
                    <header className="section-header">
                        <h2>Precios de juego libre</h2>
                        <p>Sin reserva. Pago en recepción al entrar.</p>
                        <div className="divider" />
                    </header>
                    <div className="juego-precios__grid">
                        <div className="juego-precio-card">
                            <span className="juego-precio-card__icon">📅</span>
                            <h3>De martes a jueves</h3>
                            <div className="juego-precio-card__rows">
                                <div className="juego-precio-row">
                                    <span>15 minutos</span>
                                    <strong>1,50€</strong>
                                </div>
                                <div className="juego-precio-row">
                                    <span>1 hora</span>
                                    <strong>6,00€</strong>
                                </div>
                            </div>
                        </div>
                        <div className="juego-precio-card juego-precio-card--featured">
                            <span className="juego-precio-card__icon">🎉</span>
                            <h3>Viernes a domingo, vísperas y festivos</h3>
                            <div className="juego-precio-card__rows">
                                <div className="juego-precio-row">
                                    <span>15 minutos</span>
                                    <strong>2,00€</strong>
                                </div>
                                <div className="juego-precio-row">
                                    <span>1 hora</span>
                                    <strong>8,00€</strong>
                                </div>
                            </div>
                        </div>
                        <div className="juego-precio-card juego-precio-card--promo">
                            <span className="juego-precio-card__icon">🎟️</span>
                            <h3>¿Venís más de 2 veces/semana?</h3>
                            <p>El <strong>Bono Indy</strong> te sale más a cuenta: 12 horas por <strong>39€</strong>.</p>
                            <a href="/bono-indy" className="juego-precio-card__link">Ver Bono Indy →</a>
                        </div>
                    </div>
                    <div className="juego-precios__img-wrap">
                        <img
                            src={`${BASE}img/precios-juego.jpg`}
                            alt="Precios de juego libre en Indiana Bill: martes a jueves 15 min 1,50€ / 1h 6€; viernes a domingo, vísperas y festivos 15 min 2€ / 1h 8€"
                            className="juego-precios__img"
                            loading="lazy"
                            width="1200"
                            height="800"
                        />
                    </div>
                </div>
            </section>

            {/* Horarios */}
            <section className="section" id="horarios">
                <div className="container">
                    <header className="section-header">
                        <h2>Horarios</h2>
                        <p>Consulta cuándo podéis venir a jugar</p>
                        <div className="divider" />
                    </header>
                    <div className="juego-horarios">
                        {HORARIOS.map((h) => (
                            <div key={h.dia} className={`juego-horario-item${h.hora.includes('Cerrado') ? ' juego-horario-item--closed' : ''}`}>
                                <span className="juego-horario-item__dia">{h.dia}</span>
                                <span className="juego-horario-item__hora">{h.hora}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Edades */}
            <section className="section juego-edades">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Para qué edades?</h2>
                        <div className="divider" />
                    </header>
                    <div className="juego-edades__grid">
                        <div className="juego-edad-card">
                            
                            <h3>Zona pequeños</h3>
                            <p>Área adaptada y segura para los más pequeños, de 0 a 4 años</p>
                        </div>
                        <div className="juego-edad-card">
                            
                            <h3>Zona grandes</h3>
                            <p>Toboganes, hinchables y parque de bolas para niños de 4 a 12 años</p>
                        </div>
                        <div className="juego-edad-card">
                            
                            <h3>Martes en Familia</h3>
                            <p>Los martes los adultos también pueden entrar a jugar con los niños</p>
                            <Link to="/martes-en-familia" className="juego-edad-card__link">Ver más →</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Promociones especiales */}
            <section className="section juego-promos">
                <div className="container">
                    <header className="section-header">
                        <h2>Promociones especiales</h2>
                        <p>Ahorra con nuestras ofertas para familias que vienen entre semana</p>
                        <div className="divider" />
                    </header>
                    <div className="juego-promos__grid">
                        <Link to="/martes-en-familia" className="juego-promo-card">
                            <span className="juego-promo-card__icon">👨‍👩‍👧‍👦</span>
                            <h3>Martes en Familia</h3>
                            <p>Los martes los adultos también pueden jugar con los niños a precio especial</p>
                            <span className="juego-promo-card__cta">Ver condiciones →</span>
                        </Link>
                        <Link to="/bono-indy" className="juego-promo-card">
                            <span className="juego-promo-card__icon">🎟️</span>
                            <h3>Bono Indy</h3>
                            <p>12 horas de juego por 39€ válido martes, miércoles y jueves</p>
                            <span className="juego-promo-card__cta">Solicitar bono →</span>
                        </Link>
                        <Link to="/dado-loco" className="juego-promo-card">
                            <span className="juego-promo-card__icon">🎲</span>
                            <h3>Dado Loco</h3>
                            <p>Los miércoles: tira el dado y si sale un 6, ¡el juego es gratis!</p>
                            <span className="juego-promo-card__cta">Ver cómo funciona →</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Normas */}
            <section className="section juego-normas">
                <div className="container">
                    <header className="section-header">
                        <h2>Normas básicas</h2>
                        <div className="divider" />
                    </header>
                    <ul className="juego-normas__list">
                        {NORMAS.map((n) => (
                            <li key={n} className="juego-norma-item">
                                <span className="juego-norma-item__icon">✓</span>
                                <p>{n}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="juego-cta">
                <div className="container juego-cta__inner">
                    <div>
                        <h2>¿Tienes alguna duda?</h2>
                        <p>Escríbenos y te respondemos en minutos</p>
                    </div>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                        Preguntar por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
