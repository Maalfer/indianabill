import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import './PanelPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function VerificarPage() {
    const [status, setStatus] = useState('loading') // loading | ok | error

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        if (!token) { setStatus('error'); return }
        fetch(`${API}/auth/verificar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then((r) => setStatus(r.ok ? 'ok' : 'error'))
            .catch(() => setStatus('error'))
    }, [])

    return (
        <>
            <Seo title="Verificar email | Indiana Bill Gijón" description="Verificación de email de tu cuenta de Indiana Bill." path="/verificar" />
            <div className="panel-hero panel-hero--compact">
                <div className="container">
                    {status === 'loading' && <h1>Verificando tu email…</h1>}
                    {status === 'ok' && (
                        <>
                            <h1>¡Email verificado!</h1>
                            <p>Tu cuenta ya está activa. Inicia sesión para ver tus reservas.</p>
                            <div className="panel-hero__ctas">
                                <Link to="/login" className="auth-link" style={{ fontWeight: 700 }}>Iniciar sesión →</Link>
                            </div>
                        </>
                    )}
                    {status === 'error' && (
                        <>
                            <h1>Enlace no válido</h1>
                            <p>Este enlace de verificación no es válido o ya se ha usado. Inicia sesión y pide uno nuevo desde tu panel.</p>
                            <div className="panel-hero__ctas">
                                <Link to="/login" className="auth-link" style={{ fontWeight: 700 }}>Ir a iniciar sesión →</Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
