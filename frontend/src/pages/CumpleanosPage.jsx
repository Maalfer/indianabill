import Button from '../components/Button'
import LeadForm from '../components/LeadForm'
import FAQAccordion from '../components/FAQAccordion'
import './CumpleanosPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=%C2%A1Hola!%20Me%20interesa%20reservar%20un%20cumplea%C3%B1os%20en%20Indiana%20Bill%20Gij%C3%B3n%20%F0%9F%8E%82.%20%C2%BFMe%20pod%C3%A9is%20dar%20m%C3%A1s%20informaci%C3%B3n%3F'

const INCLUYE = [
    { icon: '🍔', label: 'Merienda completa' },
    { icon: '🥤', label: 'Bebida incluida' },
    { icon: '🎂', label: 'Tarta y velas' },
    { icon: '🎁', label: 'Regalo al anfitrión' },
    { icon: '🏠', label: 'Parque cubierto ilimitado' },
    { icon: '👩‍🏫', label: 'Monitores' },
    { icon: '🏋️', label: 'Hinchables y toboganes' },
    { icon: '🎳', label: 'Piscina de bolas' },
    { icon: '⚽', label: 'Pista de fútbol' },
]

const PASOS = [
    { num: '1', title: 'Nos contactas', desc: 'Por WhatsApp, teléfono o formulario con la fecha deseada.' },
    { num: '2', title: 'Confirmamos fecha', desc: 'Revisamos disponibilidad y te respondemos rápido.' },
    { num: '3', title: 'Reserva con fianza', desc: 'Pequeño pago para formalizar. El resto, el día del cumpleaños.' },
    { num: '4', title: '¡A celebrar!', desc: 'Llegáis y nosotros tenemos todo preparado.' },
]

const FAQ_CUMPLE = [
    {
        pregunta: '¿Para qué edades es el cumpleaños?',
        respuesta: 'Nuestra especialidad son los cumpleaños de niños de 0 a 12 años. Disponemos de zonas diferenciadas para los más pequeños y para los más mayores.',
    },
    {
        pregunta: '¿Es un espacio privado?',
        respuesta: 'Sí. El local queda reservado exclusivamente para tu fiesta. Solo estaréis vosotros durante toda la celebración.',
    },
    {
        pregunta: '¿Cuánto dura el cumpleaños?',
        respuesta: 'La celebración dura aproximadamente 4 horas. Los niños tienen acceso ilimitado al parque durante todo ese tiempo.',
    },
    {
        pregunta: '¿Tienen opciones para alérgicos?',
        respuesta: 'Sí, disponemos de menús adaptados para celíacos y otras alergias. Consúltanos al hacer la reserva y lo gestionamos sin problema.',
    },
    {
        pregunta: '¿Cuántos niños mínimo se necesitan?',
        respuesta: 'El mínimo es de 8 niños. No hay máximo establecido — ¡cuantos más, más diversión!',
    },
    {
        pregunta: '¿Cómo se paga? ¿Hay que pagar todo por adelantado?',
        respuesta: 'Solo se paga una fianza al reservar para confirmar la fecha. El resto se abona el día del cumpleaños.',
    },
    {
        pregunta: '¿Los adultos pueden entrar al parque?',
        respuesta: 'Durante el cumpleaños los adultos tienen acceso a la zona de cafetería y comedor. El parque es para los peques.',
    },
    {
        pregunta: '¿Qué pasa si necesito cancelar?',
        respuesta: 'Consúltanos directamente. Intentamos ser lo más flexibles posible con las cancelaciones y cambios de fecha.',
    },
]

export default function CumpleanosPage() {
    return (
        <>
            {/* HERO */}
            <div className="cumpleanos-hero">
                <div className="container">
                    <span className="cumpleanos-hero__badge">🎂 La página más importante — cumpleaños en Gijón</span>
                    <h1>Cumpleaños infantiles en Gijón sin complicaciones</h1>
                    <p>
                        Más de <strong>4 horas reales de diversión</strong> para los peques y tranquilidad para vosotros.
                        Nos encargamos de todo.
                    </p>
                    <div className="cumpleanos-hero__ctas">
                        <Button href="#formulario" variant="primary" size="lg">
                            📅 Consultar disponibilidad
                        </Button>
                        <Button href="#menus" variant="outline" size="lg">
                            Ver precios
                        </Button>
                        <a href={WA} target="_blank" rel="noopener noreferrer" className="cumpleanos-hero__wa">
                            💬 WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* QUÉ INCLUYE */}
            <section className="section cumpleanos-incluye">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué incluye el cumpleaños?</h2>
                        <p>Todo lo que necesitáis para una celebración perfecta</p>
                        <div className="divider" />
                    </header>
                    <div className="cumpleanos-incluye__grid">
                        {INCLUYE.map((item) => (
                            <div key={item.label} className="cumpleanos-incluye-item">
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MENÚS Y PRECIOS */}
            <section className="section cumpleanos-menus" id="menus">
                <div className="container">
                    <header className="section-header">
                        <h2>Menús y precios</h2>
                        <p>Desde 19,50€/niño — transparencia total, sin sorpresas</p>
                        <div className="divider" />
                    </header>
                    <div className="menus-images">
                        <img src={import.meta.env.BASE_URL + 'menu1.png'} alt="Menú Indy — cumpleaños en Gijón" className="menus-images__img" />
                        <img src={import.meta.env.BASE_URL + 'menu2.png'} alt="Menú Super Indy — cumpleaños en Gijón" className="menus-images__img" />
                    </div>
                    <div className="menu-alergenos">
                        <img src={import.meta.env.BASE_URL + 'menuAlergenos.jpg'} alt="Información de alérgenos" className="menu-alergenos__img" />
                    </div>
                    <p className="menus-nota">Mínimo 8 niños. El precio incluye el acceso al parque durante toda la celebración. Consúltanos si tienes necesidades especiales de alergia o dieta.</p>
                </div>
            </section>

            {/* CÓMO RESERVAR */}
            <section className="section cumpleanos-como">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Cómo reservar?</h2>
                        <p>Solo 4 pasos y tenéis el cumpleaños listo</p>
                        <div className="divider" />
                    </header>
                    <div className="cumpleanos-como__steps">
                        {PASOS.map((p) => (
                            <div key={p.num} className="cumpleanos-como__step">
                                <div className="cumpleanos-como__step-num">{p.num}</div>
                                <h4>{p.title}</h4>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="cumpleanos-como__contact">
                        <a href="tel:985374167" className="cumpleanos-como__tel">📞 985 374 167</a>
                        <span className="cumpleanos-como__o">o</span>
                        <a href="tel:684657760" className="cumpleanos-como__tel">📱 684 657 760</a>
                    </div>
                </div>
            </section>

            {/* FORMULARIO */}
            <section className="section cumpleanos-form" id="formulario">
                <div className="container">
                    <div className="cumpleanos-form__layout">
                        <div className="cumpleanos-form__left">
                            <h2>Consulta disponibilidad</h2>
                            <p>Rellena el formulario y te respondemos en menos de 24 horas. Sin compromiso.</p>
                            <ul className="cumpleanos-form__bullets">
                                <li>✅ Respuesta rápida garantizada</li>
                                <li>✅ Sin compromiso de reserva</li>
                                <li>✅ Te avisamos si la fecha está libre</li>
                                <li>✅ Las fechas de fin de semana se agotan</li>
                            </ul>
                            <p className="cumpleanos-form__urgencia">
                                Las fechas de fin de semana suelen reservarse con semanas de antelación. No lo dejes para el último momento.
                            </p>
                        </div>
                        <div className="cumpleanos-form__right">
                            <LeadForm servicio="cumpleanos" />
                        </div>
                    </div>
                </div>
            </section>

            {/* HORARIO */}
            <section className="section cumpleanos-horario">
                <div className="container">
                    <header className="section-header">
                        <h2>Horario de cumpleaños</h2>
                        <div className="divider" />
                    </header>
                    <div className="horario-card">
                        <div className="horario-item">
                            <span className="horario-day">Lunes</span>
                            <span className="horario-time">Cerrado (excepto vísperas y festivos)</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Martes y Jueves</span>
                            <span className="horario-time">17:00 a 21:00</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Viernes, Sábado y Vísperas</span>
                            <span className="horario-time">17:00 a 21:30</span>
                        </div>
                        <div className="horario-item">
                            <span className="horario-day">Domingo y festivos</span>
                            <span className="horario-time">17:00 a 21:00</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ACTIVIDADES */}
            <section className="section cumpleanos-actividades">
                <div className="container">
                    <header className="section-header">
                        <h2>Actividades incluidas</h2>
                        <p>Además del juego libre, hacemos actividades dirigidas durante la celebración</p>
                        <div className="divider" />
                    </header>
                    <div className="actividades-grid">
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎈</span>
                            <h3>Globoflexia</h3>
                            <p>Diversión con globos y animación para los peques</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">⚽</span>
                            <h3>Torneo de fútbol</h3>
                            <p>Competencias amistosas en la pista techada</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎨</span>
                            <h3>Pintacaras</h3>
                            <p>Arte facial divertido para todos los niños</p>
                        </div>
                        <div className="actividad-card">
                            <span className="actividad-card__icon">🎮</span>
                            <h3>Juego libre</h3>
                            <p>Parque de bolas, toboganes, hinchables y mucho más</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section cumpleanos-faq">
                <div className="container">
                    <header className="section-header">
                        <h2>Preguntas frecuentes</h2>
                        <p>Todo lo que necesitas saber antes de reservar</p>
                        <div className="divider" />
                    </header>
                    <FAQAccordion items={FAQ_CUMPLE} />
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="cumpleanos-cta">
                <div className="container">
                    <div className="cumpleanos-cta__content">
                        <div>
                            <h2>Consulta disponibilidad antes de que se llenen las fechas</h2>
                            <p>Los fines de semana se reservan rápido. Escríbenos ahora.</p>
                        </div>
                        <div className="cumpleanos-cta__buttons">
                            <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                                💬 WhatsApp
                            </Button>
                            <Button href="#formulario" variant="outline" size="lg">
                                📅 Formulario
                            </Button>
                            <Button href="tel:684657760" variant="ghost" size="lg">
                                📞 Llamar
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
