import Button from '../components/Button'
import Seo from '../components/Seo'
import './FiestasPrivadasPage.css'

const BASE = import.meta.env.BASE_URL

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
            <Seo
                title="Fiestas privadas en Gijón: adultos, despedidas y grupos | Indiana Bill"
                description="Reserva el parque para tu grupo en Gijón: despedidas, cumpleaños de adolescentes, grupos y fiestas de adultos. Desde 8€/hora. Consulta por WhatsApp."
                path="/fiestas-privadas"
            />
            <div className="privadas-hero">
                <div className="container">
                    <span className="privadas-hero__badge">Reserva exclusiva del local</span>
                    <h1>Fiestas privadas en Gijón</h1>
                    <p>Un plan diferente para jugar, reír y celebrar en grupo dentro del parque de bolas más grande de Asturias</p>
                    <div className="privadas-hero__ctas">
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            Pedir información por WhatsApp
                        </Button>
                        <a href="tel:684657760" className="privadas-hero__tel">Llamar</a>
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

            {/* VÍDEO — el local para grupos y adultos */}
            <section className="section privadas-video">
                <div className="container">
                    <header className="section-header">
                        <h2>El local también es para vosotros</h2>
                        <p>Adultos, grupos, despedidas y celebraciones diferentes en 1.300 m²</p>
                        <div className="divider" />
                    </header>
                    <div className="privadas-video__frame">
                        <video
                            className="privadas-video__video"
                            src={`${BASE}video/privadas.mp4`}
                            poster={`${BASE}video/privadas.jpg`}
                            controls
                            playsInline
                            preload="none"
                            aria-label="Vídeo de fiestas privadas para adultos y grupos en Indiana Bill Gijón"
                        />
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
                    <p className="privadas-opciones__intro">
                        Las fiestas privadas se realizan siempre con reserva previa y fuera del horario comercial infantil.
                        Podemos adaptar el horario según disponibilidad del local, tipo de evento y organización interna,
                        así que si tenéis una idea concreta, consultadnos por WhatsApp o teléfono.
                    </p>
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
                            </ul>
                        </div>
                    </div>
                    <p className="privadas-opciones__nota">
                        Los horarios pueden variar según disponibilidad. Consúltanos y vemos la mejor opción para vuestro grupo.
                    </p>
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

            {/* CONTACTO */}
            <section className="section privadas-form" id="contacto-privadas">
                <div className="container">
                    <div className="privadas-form__layout">
                        <div className="privadas-form__left">
                            <h2>Cuéntanos qué celebráis</h2>
                            <p>Escríbenos por WhatsApp o llámanos y te preparamos una propuesta a medida para vuestro grupo.</p>
                            <ul className="privadas-form__bullets">
                                <li>Despedidas, cumpleaños adolescentes, grupos</li>
                                <li>Mínimo 8 personas</li>
                                <li>Espacio privado y exclusivo</li>
                                <li>Consulta disponibilidad sin compromiso</li>
                            </ul>
                        </div>
                        <div className="privadas-form__ctas">
                            <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                                Consultar por WhatsApp
                            </Button>
                            <Button href="tel:684657760" variant="outline" size="lg">
                                Llamar al 684 657 760
                            </Button>
                            <Button href="/localizacion" variant="ghost" size="lg">
                                Cómo llegar al local
                            </Button>
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
                        Consultar por WhatsApp
                    </Button>
                </div>
            </section>
        </>
    )
}
