import Button from '../components/Button'
import LeadForm from '../components/LeadForm'
import './FiestasPrivadasPage.css'

const TIPOS = [
    { icon: '🎂', title: 'Cumpleaños adolescentes', desc: 'Celebra con tus amigos de una forma diferente. Sin límite de diversión.' },
    { icon: '🎉', title: 'Despedidas', desc: 'La despedida más original de Gijón. Garantía de recuerdos para siempre.' },
    { icon: '👥', title: 'Grupos de amigos', desc: 'Un plan diferente para cualquier ocasión. Mínimo 8 personas.' },
    { icon: '🎊', title: 'Fiestas de adultos', desc: 'Redescubre la diversión. Toboganes, bolas y cancha de fútbol para ti.' },
    { icon: '👨‍👩‍👧‍👦', title: 'Reuniones familiares', desc: 'Reúne a toda la familia en el mejor ambiente cubierto de Asturias.' },
    { icon: '🏢', title: 'Eventos privados', desc: 'Celebraciones especiales para empresas y grupos organizados.' },
]

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20informaci%C3%B3n%20para%20organizar%20una%20fiesta%20privada%20en%20Indiana%20Bill%20Gij%C3%B3n'

export default function FiestasPrivadasPage() {
    return (
        <>
            <div className="privadas-hero">
                <div className="container">
                    <span className="privadas-hero__badge">🎉 Reserva exclusiva del local</span>
                    <h1>Fiestas privadas en Gijón</h1>
                    <p>Un plan diferente para jugar, reír y celebrar en grupo dentro del parque de bolas más grande de Asturias</p>
                    <div className="privadas-hero__ctas">
                        <Button href="#formulario-privadas" variant="primary" size="lg">
                            📅 Pedir información
                        </Button>
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="outline" size="lg">
                            💬 WhatsApp
                        </Button>
                        <a href="tel:684657760" className="privadas-hero__tel">📞 Llamar</a>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué tipo de celebración buscas?</h2>
                        <p>Adaptamos el parque a tu grupo y ocasión</p>
                        <div className="divider" />
                    </header>
                    <div className="privadas-tipos">
                        {TIPOS.map((t) => (
                            <div key={t.title} className="privadas-tipo-card">
                                <span className="privadas-tipo-card__icon">{t.icon}</span>
                                <h3>{t.title}</h3>
                                <p>{t.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section privadas-opciones">
                <div className="container">
                    <header className="section-header">
                        <h2>Opciones y precios</h2>
                        <p>Elige la modalidad que mejor encaja con tu grupo</p>
                        <div className="divider" />
                    </header>
                    <div className="privadas-opciones__grid">
                        <div className="privadas-opcion">
                            <div className="privadas-opcion__header">
                                <span className="privadas-opcion__icon">⏰</span>
                                <h3>Solo juegos</h3>
                                <span className="privadas-opcion__price">8€/hora por persona</span>
                            </div>
                            <ul className="privadas-opcion__list">
                                <li>Reserva previa necesaria</li>
                                <li>Mínimo 8 personas</li>
                                <li>Mínimo 2 horas</li>
                                <li>Horario: 14:00 a 16:00</li>
                            </ul>
                        </div>
                        <div className="privadas-opcion privadas-opcion--featured">
                            <div className="privadas-opcion__header">
                                <span className="privadas-opcion__icon">🍽️</span>
                                <h3>Juego + comida</h3>
                                <span className="privadas-opcion__price">25€ por persona</span>
                            </div>
                            <ul className="privadas-opcion__list">
                                <li>Reserva previa necesaria</li>
                                <li>Mínimo 8 personas</li>
                                <li>3 horas de juego incluidas</li>
                                <li>Comida incluida</li>
                                <li>Horario: 13:00 a 16:00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo reservar?</h2>
                        <div className="divider" />
                    </header>
                    <div className="privadas-steps">
                        {[
                            { n: '1', h: 'Contacta con nosotros', p: 'Llama o escríbenos por WhatsApp para consultar disponibilidad' },
                            { n: '2', h: 'Confirma el grupo', p: 'Mínimo 8 personas para poder realizar la reserva' },
                            { n: '3', h: 'Formaliza el pago', p: 'Depósito mínimo de 8 personas. La diferencia se abona en el local antes de entrar' },
                        ].map((s) => (
                            <div key={s.n} className="privadas-step">
                                <div className="privadas-step__num">{s.n}</div>
                                <div>
                                    <h3>{s.h}</h3>
                                    <p>{s.p}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="privadas-contact">
                        <p>Para reservar llama a:</p>
                        <div className="privadas-contact__numbers">
                            <a href="tel:985374167">985 374 167</a>
                            <span>o</span>
                            <a href="tel:684657760">684 657 760</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="section privadas-form" id="formulario-privadas">
                <div className="container">
                    <div className="privadas-form__layout">
                        <div className="privadas-form__left">
                            <h2>Cuéntanos qué celebráis</h2>
                            <p>Rellena el formulario y te preparamos una propuesta a medida en menos de 24 horas.</p>
                            <ul className="privadas-form__bullets">
                                <li>🎉 Despedidas, cumpleaños adolescentes, grupos</li>
                                <li>👥 Mínimo 8 personas</li>
                                <li>🏠 Espacio privado y exclusivo</li>
                                <li>📅 Consulta disponibilidad sin compromiso</li>
                            </ul>
                        </div>
                        <div>
                            <LeadForm servicio="fiestas_privadas" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="privadas-cta">
                <div className="container privadas-cta__inner">
                    <div>
                        <h2>¿Tienes dudas? ¡Escríbenos!</h2>
                        <p>Cuéntanos qué celebráis y te preparamos una propuesta</p>
                    </div>
                    <Button href={WA} target="_blank" rel="noopener noreferrer" variant="ghost" size="lg">
                        💬 Consultar por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
