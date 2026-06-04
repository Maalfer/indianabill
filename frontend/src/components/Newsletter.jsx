import { useState } from 'react'
import { trackEvent } from '../utils/tracking'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('idle') // idle | sending | ok | error

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return
        setStatus('sending')
        try {
            const res = await fetch(`${API}/api/newsletter/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, origen: 'web' }),
            })
            if (!res.ok) throw new Error('bad status')
            trackEvent('newsletter_signup', { origen: 'footer' })
            setStatus('ok')
            setEmail('')
        } catch {
            setStatus('error')
        }
    }

    return (
        <div className="newsletter">
            <h4 className="newsletter__title">Newsletter</h4>
            <p className="newsletter__text">
                Ofertas, novedades y promociones de Indiana Bill en tu correo.
            </p>
            {status === 'ok' ? (
                <p className="newsletter__ok">¡Gracias! Te has suscrito correctamente.</p>
            ) : (
                <form className="newsletter__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        className="newsletter__input"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-label="Tu email para la newsletter"
                        required
                    />
                    <button type="submit" className="newsletter__btn" disabled={status === 'sending'}>
                        {status === 'sending' ? '…' : 'Suscribirme'}
                    </button>
                </form>
            )}
            {status === 'error' && (
                <p className="newsletter__err">No se pudo completar. Inténtalo de nuevo en un momento.</p>
            )}
        </div>
    )
}
