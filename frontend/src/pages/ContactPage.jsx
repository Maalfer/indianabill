import { useState } from 'react'
import Button from '../components/Button'
import './ContactPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const INITIAL = { nombre: '', email: '', telefono: '', mensaje: '', servicio: '' }

export default function ContactPage() {
    const [form, setForm] = useState(INITIAL)
    const [status, setStatus] = useState('idle') // idle | sending | ok | error

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')
        try {
            await fetch(`${API}/api/leads/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre,
                    email: form.email || undefined,
                    telefono: form.telefono || undefined,
                    comentarios: form.mensaje || undefined,
                    servicio: form.servicio || 'contacto',
                    origen: 'web',
                }),
            })
        } catch {
            // silently continue — WA fallback ensures the inquiry is not lost
        }
        const lines = [`Hola, soy ${form.nombre} (${form.email})`]
        if (form.telefono) lines.push(`Teléfono: ${form.telefono}`)
        if (form.servicio) lines.push(`Servicio: ${form.servicio}`)
        lines.push('', form.mensaje)
        const waUrl = `https://api.whatsapp.com/send?phone=34684657760&text=${encodeURIComponent(lines.join('\n'))}`
        window.open(waUrl, '_blank')
        setStatus('ok')
    }

    return (
        <>
            {/* Hero */}
            <div className="contact-hero">
                <div className="container">
                    <span className="contact-hero__badge">📩 Estamos aquí para ayudarte</span>
                    <h1>Contacta con nosotros</h1>
                    <p>Reservas, preguntas o lo que necesites — respondemos en menos de 24h</p>
                </div>
            </div>

            <section className="section">
                <div className="container contact-layout">
                    {/* Form */}
                    <div className="contact-form-wrap">
                        <h2>Envíanos un mensaje</h2>

                        {status === 'ok' ? (
                            <div className="contact-success">
                                <span className="contact-success__icon">🎉</span>
                                <h3>¡Mensaje enviado!</h3>
                                <p>Nos pondremos en contacto contigo muy pronto.</p>
                                <Button onClick={() => { setForm(INITIAL); setStatus('idle') }} variant="primary">
                                    Enviar otro mensaje
                                </Button>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit} noValidate>
                                <div className="contact-form__row">
                                    <label>
                                        Nombre *
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            required
                                        />
                                    </label>
                                    <label>
                                        Email *
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="tu@email.com"
                                            required
                                        />
                                    </label>
                                </div>

                                <div className="contact-form__row">
                                    <label>
                                        Teléfono
                                        <input
                                            type="tel"
                                            name="telefono"
                                            value={form.telefono}
                                            onChange={handleChange}
                                            placeholder="+34 600 000 000"
                                        />
                                    </label>
                                    <label>
                                        Servicio de interés
                                        <select name="servicio" value={form.servicio} onChange={handleChange}>
                                            <option value="">Selecciona uno...</option>
                                            <option value="cumpleanos-infantiles">Cumpleaños infantiles</option>
                                            <option value="fiestas-adultos">Fiestas para adultos</option>
                                            <option value="ven-a-jugar">Ven a jugar</option>
                                            <option value="bono-vip">Bono VIP</option>
                                        </select>
                                    </label>
                                </div>

                                <label>
                                    Mensaje *
                                    <textarea
                                        name="mensaje"
                                        value={form.mensaje}
                                        onChange={handleChange}
                                        placeholder="Cuéntanos qué necesitas..."
                                        rows={5}
                                        required
                                    />
                                </label>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? 'Enviando...' : '🚀 Enviar mensaje'}
                                </Button>
                            </form>
                        )}
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
                                <span className="contact-info__icon">✉️</span>
                                <div>
                                    <strong>Email</strong>
                                    <p>info@indianabillgijon.es</p>
                                </div>
                            </div>
                            <div className="contact-info__item">
                                <span className="contact-info__icon">🕐</span>
                                <div>
                                    <strong>Horario de oficina</strong>
                                    <p>Lun–Vie: 10:00 – 20:00</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            href="https://wa.me/34684657760"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="primary"
                            size="lg"
                            fullWidth
                        >
                            💬 WhatsApp directo
                        </Button>
                    </aside>
                </div>
            </section>
        </>
    )
}
