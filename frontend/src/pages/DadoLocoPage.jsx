import Button from '../components/Button'
import './DadoLocoPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20el%20Dado%20Loco%20en%20Indiana%20Bill%20Gij%C3%B3n'

export default function DadoLocoPage() {
    return (
        <>
            <div className="dado-hero">
                <div className="container">
                    <span className="dado-hero__badge">🎲 Cada miércoles</span>
                    <h1>Dado Loco</h1>
                    <p>Los miércoles tiras el dado al entrar. Si sale un 6, el juego es gratis. Así de sencillo.</p>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                        Venir este miércoles
                    </Button>
                </div>
            </div>

            {/* Cómo funciona */}
            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo funciona el Dado Loco?</h2>
                        <div className="divider" />
                    </header>
                    <div className="dado-como-funciona">
                        <div className="dado-paso">
                            <div className="dado-paso__num">1</div>
                            <div className="dado-paso__content">
                                <h3>Ven cualquier miércoles</h3>
                                <p>El Dado Loco está disponible todos los miércoles durante el horario habitual del parque</p>
                            </div>
                        </div>
                        <div className="dado-paso">
                            <div className="dado-paso__num">2</div>
                            <div className="dado-paso__content">
                                <h3>Tira el dado al entrar</h3>
                                <p>Al llegar al local, lanzas el dado antes de pagar</p>
                            </div>
                        </div>
                        <div className="dado-paso">
                            <div className="dado-paso__num dado-paso__num--gold">6</div>
                            <div className="dado-paso__content">
                                <h3>¡Si sale 6, gratis!</h3>
                                <p>Si el dado muestra un 6, ese día el juego no se paga. Suerte para todos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dado visual */}
            <section className="section dado-visual">
                <div className="container">
                    <div className="dado-visual__content">
                        <div className="dado-visual__dice">🎲</div>
                        <div className="dado-visual__text">
                            <h2>Una posibilidad entre 6</h2>
                            <p>
                                Cada miércoles, cada niño tiene la misma oportunidad de conseguir un día de juego gratis.
                                Es la forma más emocionante de empezar la tarde en Indiana Bill.
                            </p>
                            <p>
                                Aunque no salga el 6, el precio habitual de entrada sigue siendo el mismo.
                                Así que siempre merece la pena intentarlo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Condiciones y horario */}
            <section className="section dado-condiciones">
                <div className="container">
                    <header className="section-header">
                        <h2>Condiciones y horario</h2>
                        <div className="divider" />
                    </header>
                    <div className="dado-condiciones__grid">
                        <div className="dado-condicion-card">
                            <span>📅</span>
                            <h3>Día</h3>
                            <p>Todos los miércoles del año</p>
                        </div>
                        <div className="dado-condicion-card">
                            <span>🕔</span>
                            <h3>Horario</h3>
                            <p>17:00 a 21:00</p>
                        </div>
                        <div className="dado-condicion-card">
                            <span>🎯</span>
                            <h3>Válido para</h3>
                            <p>Juego libre. No aplica a cumpleaños ni fiestas privadas</p>
                        </div>
                        <div className="dado-condicion-card dado-condicion-card--highlight">
                            <span>🎲</span>
                            <h3>El resultado</h3>
                            <p>Si sale 6 → gratis. Cualquier otro número → precio habitual de entrada</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="dado-cta">
                <div className="container dado-cta__inner">
                    <div>
                        <h2>¿Te atreves a tirar el dado?</h2>
                        <p>Todos los miércoles tienes una oportunidad. ¡No la desaproveches!</p>
                    </div>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                        💬 Preguntar por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
