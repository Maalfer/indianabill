import Button from '../components/Button'
import Seo from '../components/Seo'
import './BonoIndyPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20solicitar%20el%20Bono%20Indy%20en%20Indiana%20Bill%20Gij%C3%B3n'

export default function BonoIndyPage() {
    return (
        <>
            <Seo
                title="Bono Indy — 12 horas de juego por 39€ | Indiana Bill Gijón"
                description="El Bono Indy de Indiana Bill Gijón: 12 horas de juego libre por 39€, válido martes, miércoles y jueves. La opción más económica para venir entre semana."
                path="/bono-indy"
            />
            <div className="bono-hero">
                <div className="container">
                    <span className="bono-hero__badge">Para familias que vienen entre semana</span>
                    <h1>Bono Indy</h1>
                    <p>12 horas de juego libre por 39€. La opción más económica si venís varios días entre semana.</p>
                    <div className="bono-hero__price-badge">
                        <span className="bono-hero__price">39€</span>
                        <span className="bono-hero__price-sub">12 horas de juego</span>
                    </div>
                    <div className="bono-hero__ctas">
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            Solicitar Bono Indy
                        </Button>
                        <a href="tel:684657760" className="bono-hero__tel">Llamar</a>
                    </div>
                </div>
            </div>

            {/* Qué es */}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué es el Bono Indy?</h2>
                        <div className="divider" />
                    </header>
                    <div className="bono-que-es">
                        <p>
                            El <strong>Bono Indy</strong> es nuestro bono de horas pensado para las familias que vienen
                            a menudo durante la semana. Con 39€ obtienes <strong>12 horas de juego libre</strong>
                            que puedes consumir a tu ritmo en los días habilitados.
                        </p>
                        <p>
                            Es la opción más económica frente a pagar por horas sueltas.
                            Ideal para familias que visitan el parque 2 o 3 veces por semana.
                        </p>
                    </div>
                </div>
            </section>

            {/* Detalles */}
            <section className="section bono-detalles">
                <div className="container">
                    <header className="section-header">
                        <h2>Todo sobre el Bono Indy</h2>
                        <div className="divider" />
                    </header>
                    <div className="bono-detalles__grid">
                        <div className="bono-detalle-card">
                            <span className="bono-detalle-card__icon">💶</span>
                            <h3>Precio</h3>
                            <p><strong>39€</strong> por bono</p>
                        </div>
                        <div className="bono-detalle-card">
                            <span className="bono-detalle-card__icon">⏱️</span>
                            <h3>Horas incluidas</h3>
                            <p><strong>12 horas</strong> de juego libre</p>
                        </div>
                        <div className="bono-detalle-card">
                            <span className="bono-detalle-card__icon">📅</span>
                            <h3>Días válidos</h3>
                            <p>Martes, miércoles y jueves</p>
                        </div>
                        <div className="bono-detalle-card">
                            <span className="bono-detalle-card__icon">🔄</span>
                            <h3>Cómo se consume</h3>
                            <p>Se descuentan las horas de cada visita. Puedes fraccionar en varias sesiones.</p>
                        </div>
                        <div className="bono-detalle-card">
                            <span className="bono-detalle-card__icon">⏳</span>
                            <h3>Caducidad</h3>
                            <p>Consultar al adquirirlo en el local o por WhatsApp</p>
                        </div>
                        <div className="bono-detalle-card bono-detalle-card--highlight">
                            <span className="bono-detalle-card__icon">💡</span>
                            <h3>Ventaja frente a horas sueltas</h3>
                            <p>Ahorro significativo si venís 2 o más veces por semana</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cómo solicitarlo */}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo solicitar el bono?</h2>
                        <div className="divider" />
                    </header>
                    <div className="bono-steps">
                        {[
                            { n: '1', h: 'Contáctanos', p: 'Escríbenos por WhatsApp o llama al 684 657 760' },
                            { n: '2', h: 'Ven al local', p: 'El bono se formaliza en el local con el pago correspondiente' },
                            { n: '3', h: 'Empieza a disfrutar', p: 'Usa las horas cuando quieras en los días válidos (mar, mié, jue)' },
                        ].map((s) => (
                            <div key={s.n} className="bono-step">
                                <div className="bono-step__num">{s.n}</div>
                                <div>
                                    <h3>{s.h}</h3>
                                    <p>{s.p}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bono-cta">
                <div className="container bono-cta__inner">
                    <div>
                        <h2>¿Te interesa el Bono Indy?</h2>
                        <p>Escríbenos y te damos todos los detalles</p>
                    </div>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                        Solicitar Bono Indy por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
