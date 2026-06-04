import Button from '../components/Button'
import Seo from '../components/Seo'
import './ContactPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20tengo%20una%20consulta%20sobre%20Indiana%20Bill%20Gij%C3%B3n'

export default function ContactPage() {
    return (
        <>
            <Seo
                title="Contacto — Indiana Bill Gijón | WhatsApp y teléfono"
                description="Contacta con Indiana Bill Gijón por WhatsApp, teléfono (684 657 760) o en C/ Espronceda 17. Reservas de cumpleaños, fiestas privadas y consultas."
                path="/contacto"
            />
            {/* Hero */}
            <div className="contact-hero">
                <div className="container">
                    <span className="contact-hero__badge">Estamos aquí para ayudarte</span>
                    <h1>Contacta con nosotros</h1>
                    <p>La forma más rápida de reservar o resolver dudas es por WhatsApp, teléfono o pasándote por el local</p>
                </div>
            </div>

            <section className="section">
                <div className="container contact-layout">
                    {/* CTAs principales */}
                    <div className="contact-cta-wrap">
                        <h2>¿Hablamos?</h2>
                        <p className="contact-cta-wrap__lead">
                            Escríbenos por WhatsApp, llámanos o ven a vernos. Te respondemos rápido y te ayudamos
                            con cumpleaños, fiestas privadas, juego libre o cualquier consulta.
                        </p>
                        <div className="contact-cta-wrap__buttons">
                            <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" fullWidth>
                                Escribir por WhatsApp
                            </Button>
                            <Button href="tel:684657760" variant="outline" size="lg" fullWidth>
                                Llamar al 684 657 760
                            </Button>
                            <Button href="/localizacion" variant="ghost" size="lg" fullWidth>
                                Cómo llegar al local
                            </Button>
                        </div>
                    </div>

                    {/* Info column */}
                    <aside className="contact-info">
                        <h2>Información</h2>

                        <div className="contact-info__card">
                            <div className="contact-info__item">
                                <span className="contact-info__icon">📍</span>
                                <div>
                                    <strong>Dirección</strong>
                                    <p>C/ Espronceda, 17<br />Gijón, Asturias</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <span className="contact-info__icon">📞</span>
                                <div>
                                    <strong>Teléfono</strong>
                                    <p><a href="tel:985374167">985 374 167</a> / <a href="tel:684657760">684 657 760</a></p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <span className="contact-info__icon">💬</span>
                                <div>
                                    <strong>WhatsApp</strong>
                                    <p><a href={WA} target="_blank" rel="noopener noreferrer">684 657 760</a></p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <span className="contact-info__icon">🕐</span>
                                <div>
                                    <strong>Horario</strong>
                                    <p>Mar y Jue: 17:00–21:00<br />Vie, Sáb y vísperas: 17:00–21:30<br />Dom y festivos: 17:00–21:00<br />Lun: cerrado</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </>
    )
}
