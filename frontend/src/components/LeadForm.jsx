import { useState } from 'react'
import Button from './Button'
import { trackFormSubmit } from '../utils/tracking.js'
import './LeadForm.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const WA_BASE = 'https://api.whatsapp.com/send?phone=34684657760&text='

export default function LeadForm({ servicio = 'cumpleanos', compact = false }) {
    const [form, setForm] = useState({
        nombre: '',
        telefono: '',
        email: '',
        fecha_cumpleanos: '',
        num_ninos: '',
        comentarios: '',
    })
    const [status, setStatus] = useState('idle') // idle | loading | ok | error
const [waUrl, setWaUrl] = useState('')

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch(`${API}/api/leads/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre,
                    telefono: form.telefono,
                    email: form.email || undefined,
                    fecha_cumpleanos: form.fecha_cumpleanos || undefined,
                    num_ninos: form.num_ninos ? Number(form.num_ninos) : undefined,
                    comentarios: form.comentarios || undefined,
                    servicio,
                    origen: 'web',
                }),
            })
            if (res.ok) {
                trackFormSubmit(servicio)
                const msg = encodeURIComponent(
                    `Hola, acabo de enviar el formulario en la web.\n` +
                    `Nombre: ${form.nombre}\n` +
                    `Fecha aproximada: ${form.fecha_cumpleanos || 'por concretar'}\n` +
                    `Nº de niños: ${form.num_ninos || 'por concretar'}\n` +
                    `Me gustaría consultar disponibilidad. ¡Gracias!`
                )
                setWaUrl(WA_BASE + msg)
                setStatus('ok')
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    if (status === 'ok') {
        return (
            <div className="lead-form lead-form--success">
                <div className="lead-form__success-icon">✅</div>
                <h3>¡Solicitud recibida!</h3>
                <p>Hemos recibido tu consulta. Haz clic abajo para confirmarnos los detalles por WhatsApp y te respondemos enseguida.</p>
                {waUrl && (
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="lead-form__wa-link">
                        💬 Abrir WhatsApp ahora
                    </a>
                )}
                <p className="lead-form__success-alt">O llámanos al <a href="tel:684657760">684 657 760</a></p>
            </div>
        )
    }

    return (
        <form className={`lead-form${compact ? ' lead-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
            <div className="lead-form__grid">
                <div className="lead-form__field">
                    <label htmlFor="lf-nombre">Tu nombre *</label>
                    <input
                        id="lf-nombre"
                        name="nombre"
                        type="text"
                        placeholder="María García"
                        value={form.nombre}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                    />
                </div>
                <div className="lead-form__field">
                    <label htmlFor="lf-telefono">Teléfono *</label>
                    <input
                        id="lf-telefono"
                        name="telefono"
                        type="tel"
                        placeholder="612 345 678"
                        value={form.telefono}
                        onChange={handleChange}
                        required
                        autoComplete="tel"
                    />
                </div>
                {!compact && (
                    <div className="lead-form__field">
                        <label htmlFor="lf-email">Email</label>
                        <input
                            id="lf-email"
                            name="email"
                            type="email"
                            placeholder="tu@email.com"
                            value={form.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />
                    </div>
                )}
                <div className="lead-form__field">
                    <label htmlFor="lf-fecha">Fecha aproximada *</label>
                    <input
                        id="lf-fecha"
                        name="fecha_cumpleanos"
                        type="date"
                        value={form.fecha_cumpleanos}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
                <div className="lead-form__field">
                    <label htmlFor="lf-ninos">Nº de niños *</label>
                    <input
                        id="lf-ninos"
                        name="num_ninos"
                        type="number"
                        placeholder="15"
                        min="1"
                        max="100"
                        value={form.num_ninos}
                        onChange={handleChange}
                        required
                    />
                </div>
                {!compact && (
                    <div className="lead-form__field lead-form__field--full">
                        <label htmlFor="lf-comentarios">Comentarios (alergias, dudas…)</label>
                        <textarea
                            id="lf-comentarios"
                            name="comentarios"
                            rows={3}
                            placeholder="Escríbenos lo que necesitas saber"
                            value={form.comentarios}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>
            {status === 'error' && (
                <p className="lead-form__error">Algo salió mal. Llámanos al <a href="tel:684657760">684 657 760</a> o escríbenos por WhatsApp.</p>
            )}
            <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Enviando…' : '📅 Consultar disponibilidad'}
            </Button>
            <p className="lead-form__note">Responderemos en menos de 24 horas. Sin compromiso.</p>
        </form>
    )
}
