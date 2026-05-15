import Button from '../components/Button'
import './PanelPage.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20consultar%20mi%20reserva%20en%20Indiana%20Bill%20Gij%C3%B3n'

const FUTURAS_FUNCIONES = [
    { icon: '📅', title: 'Ver mis reservas', desc: 'Consulta el estado de tu reserva, fecha, hora y detalles del menú.' },
    { icon: '🎂', title: 'Gestionar cumpleaños', desc: 'Edita el número de asistentes, menú y necesidades especiales.' },
    { icon: '💳', title: 'Pagos y facturación', desc: 'Consulta tu historial de pagos y descarga facturas.' },
    { icon: '🎟️', title: 'Bono Indy digital', desc: 'Consulta las horas disponibles en tu bono y el historial de visitas.' },
    { icon: '🏷️', title: 'Ofertas exclusivas', desc: 'Accede a descuentos y promociones disponibles solo para clientes habituales.' },
    { icon: '⭐', title: 'Valorar tu experiencia', desc: 'Comparte tu opinión y ayuda a otras familias a elegir Indiana Bill.' },
]

export default function PanelPage() {
    return (
        <>
            <div className="panel-hero">
                <div className="container">
                    <span className="panel-hero__badge">🚧 Próximamente</span>
                    <h1>Panel del cliente</h1>
                    <p>
                        Estamos preparando tu espacio personal en Indiana Bill.
                        Pronto podrás gestionar tus reservas, consultar tu bono y mucho más.
                    </p>
                    <div className="panel-hero__ctas">
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            💬 Consultar reserva por WhatsApp
                        </Button>
                        <Button href="tel:684657760" variant="outline" size="lg">
                            📞 Llamar al 684 657 760
                        </Button>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué podrás hacer aquí?</h2>
                        <p>Funciones que llegarán pronto al panel de cliente</p>
                        <div className="divider" />
                    </header>
                    <div className="panel-features">
                        {FUTURAS_FUNCIONES.map((f) => (
                            <div key={f.title} className="panel-feature-card">
                                <span className="panel-feature-card__icon">{f.icon}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                                <span className="panel-feature-card__badge">Próximamente</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="panel-cta">
                <div className="container panel-cta__inner">
                    <div>
                        <h2>¿Tienes alguna consulta sobre tu reserva?</h2>
                        <p>Mientras el panel está en desarrollo, estamos disponibles por WhatsApp y teléfono.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                            💬 WhatsApp
                        </Button>
                        <Button href="tel:684657760" variant="ghost" size="lg">
                            📞 Llamar
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
