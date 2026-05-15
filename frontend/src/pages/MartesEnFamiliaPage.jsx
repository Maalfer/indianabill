import Button from '../components/Button'
import './MartesEnFamiliaPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20Martes%20en%20Familia%20en%20Indiana%20Bill%20Gij%C3%B3n'

export default function MartesEnFamiliaPage() {
    return (
        <>
            <div className="martes-hero">
                <div className="container">
                    <span className="martes-hero__badge">👨‍👩‍👧‍👦 Cada martes</span>
                    <h1>Martes en Familia</h1>
                    <p>El único día de la semana en que los adultos también pueden bajar al parque y jugar junto a los niños</p>
                    <div className="martes-hero__ctas">
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            💬 Venir este martes
                        </Button>
                        <a href="tel:684657760" className="martes-hero__tel">📞 Llamar</a>
                    </div>
                </div>
            </div>

            {/* Qué es */}
            <section className="section">
                <div className="container">
                    <div className="martes-que-es">
                        <div className="martes-que-es__text">
                            <h2>¿Qué es el Martes en Familia?</h2>
                            <p>
                                El <strong>Martes en Familia</strong> es una iniciativa especial de Indiana Bill para que
                                toda la familia pueda disfrutar junta del parque.
                                Los martes, los adultos también pueden entrar a jugar con los niños en el parque de bolas,
                                los toboganes y los hinchables.
                            </p>
                            <p>
                                Un plan diferente para compartir momentos con los más pequeños de la casa.
                                Porque la diversión no tiene edad.
                            </p>
                        </div>
                        <div className="martes-que-es__visual">
                            <span className="martes-que-es__emoji">👨‍👩‍👧‍👦</span>
                            <p>Un plan familiar diferente cada martes</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Precios */}
            <section className="section martes-precios">
                <div className="container">
                    <header className="section-header">
                        <h2>Precios</h2>
                        <p>Tarifas del Martes en Familia</p>
                        <div className="divider" />
                    </header>
                    <div className="martes-precios__grid">
                        <div className="martes-precio-card">
                            <span className="martes-precio-card__icon">🧒</span>
                            <h3>Niños</h3>
                            <p className="martes-precio-card__price">Precio habitual</p>
                            <p>Tarifa estándar de juego libre para niños</p>
                        </div>
                        <div className="martes-precio-card martes-precio-card--destacado">
                            <span className="martes-precio-card__icon">🧑</span>
                            <h3>Adultos que juegan</h3>
                            <p className="martes-precio-card__price">Precio especial martes</p>
                            <p>Los adultos pagan tarifa reducida para entrar al parque y jugar con los niños</p>
                        </div>
                        <div className="martes-precio-card">
                            <span className="martes-precio-card__icon">☕</span>
                            <h3>Adultos acompañantes</h3>
                            <p className="martes-precio-card__price">Acceso libre</p>
                            <p>Los adultos que no juegan pueden acompañar desde la zona de cafetería sin coste adicional</p>
                        </div>
                    </div>
                    <p className="martes-precios__nota">Consulta el precio actualizado llamando al 684 657 760 o por WhatsApp</p>
                </div>
            </section>

            {/* Horario */}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>Horario</h2>
                        <div className="divider" />
                    </header>
                    <div className="martes-horario">
                        <div className="martes-horario__item">
                            <span>📅</span>
                            <div>
                                <strong>Día</strong>
                                <p>Todos los martes del año</p>
                            </div>
                        </div>
                        <div className="martes-horario__item">
                            <span>🕔</span>
                            <div>
                                <strong>Horario</strong>
                                <p>17:00 a 21:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Normas */}
            <section className="section martes-normas">
                <div className="container">
                    <header className="section-header">
                        <h2>Normas de seguridad</h2>
                        <div className="divider" />
                    </header>
                    <div className="martes-normas__grid">
                        {[
                            { icon: '🧦', text: 'Todos los participantes deben llevar calcetines' },
                            { icon: '👶', text: 'Los adultos son responsables de los niños en todo momento' },
                            { icon: '⚠️', text: 'Se respetan las normas de seguridad del parque' },
                            { icon: '🚫', text: 'No se permite acceso al área de mayores a menores sin adulto' },
                        ].map((n) => (
                            <div key={n.text} className="martes-norma-card">
                                <span>{n.icon}</span>
                                <p>{n.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="martes-cta">
                <div className="container martes-cta__inner">
                    <div>
                        <h2>¿Venís este martes?</h2>
                        <p>Escríbenos si tienes dudas sobre precios o condiciones</p>
                    </div>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                        💬 Escribir por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
