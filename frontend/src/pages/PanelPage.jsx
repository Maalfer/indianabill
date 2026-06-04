import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/Button'
import Seo from '../components/Seo'
import './PanelPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20consultar%20mi%20reserva%20en%20Indiana%20Bill%20Gij%C3%B3n'

const ESTADO_INFO = {
    consulta_recibida: { label: 'En gestión', color: '#2563eb' },
    informacion_enviada: { label: 'En gestión', color: '#3b82f6' },
    interesado: { label: 'En gestión', color: '#6366f1' },
    disponibilidad_solicitada: { label: 'Comprobando fecha', color: '#0891b2' },
    disponibilidad_confirmada: { label: 'Fecha disponible', color: '#0e7490' },
    datos_recibidos: { label: 'En gestión', color: '#7c3aed' },
    pendiente_llamada: { label: 'En gestión', color: '#d97706' },
    pendiente_gestion: { label: 'En gestión', color: '#ea580c' },
    pendiente_fianza: { label: 'Falta la fianza', color: '#f59e0b' },
    pendiente_fianza_presencial: { label: 'Falta la fianza', color: '#f97316' },
    fianza_recibida: { label: 'Confirmada', color: '#65a30d' },
    reserva_confirmada: { label: 'Confirmada', color: '#16a34a' },
    pendiente_numero_final: { label: 'Confirmada', color: '#0d9488' },
    confirmacion_final: { label: 'Confirmada', color: '#059669' },
    celebrado: { label: 'Celebrado', color: '#15803d' },
    cancelado: { label: 'Cancelada', color: '#dc2626' },
    no_convertido: { label: 'Cancelada', color: '#6b7280' },
}

const SERVICIO_ICON = { cumpleanos: '🎂', fiestas_privadas: '🎉', juego_libre: '🎮', bono: '🎟️', martes_familia: '👨‍👩‍👧‍👦', otro: '🎈' }

export default function PanelPage() {
    const { user, isAuthenticated, loading, logout } = useAuth()
    const [reservas, setReservas] = useState([])
    const [loadingRes, setLoadingRes] = useState(false)
    const [pagosConfig, setPagosConfig] = useState({ configured: false })
    const [payingId, setPayingId] = useState(null)
    const [payError, setPayError] = useState('')
    const [resendMsg, setResendMsg] = useState('')
    const fianzaParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('fianza') : null

    const reenviarVerificacion = async () => {
        setResendMsg('enviando')
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API}/auth/resend-verificacion`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
            setResendMsg(res.ok ? 'ok' : 'error')
        } catch {
            setResendMsg('error')
        }
    }

    useEffect(() => {
        if (!isAuthenticated) return
        setLoadingRes(true)
        const token = localStorage.getItem('token')
        fetch(`${API}/api/leads/mias`, { headers: { Authorization: `Bearer ${token}` } })
            .then((r) => (r.ok ? r.json() : []))
            .then((d) => setReservas(Array.isArray(d) ? d : []))
            .catch(() => {})
            .finally(() => setLoadingRes(false))
        fetch(`${API}/api/pagos/config`).then((r) => r.json()).then(setPagosConfig).catch(() => {})
    }, [isAuthenticated])

    const pagarFianza = async (id) => {
        setPayingId(id); setPayError('')
        try {
            const token = localStorage.getItem('token')
            const res = await fetch(`${API}/api/pagos/fianza-cliente/${id}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json().catch(() => ({}))
            if (res.ok && data.url) {
                window.location.href = data.url
                return
            }
            setPayError(data.detail || 'No se pudo iniciar el pago. Inténtalo más tarde.')
        } catch {
            setPayError('Error de conexión.')
        }
        setPayingId(null)
    }

    // ── No autenticado: invitación a iniciar sesión ──────────────────────────
    if (!loading && !isAuthenticated) {
        return (
            <>
                <Seo title="Panel del cliente | Indiana Bill Gijón" description="Accede a tu panel para consultar tus reservas de cumpleaños en Indiana Bill Gijón." path="/panel" />
                <div className="panel-hero">
                    <div className="container">
                        <span className="panel-hero__badge">Tu espacio personal</span>
                        <h1>Panel del cliente</h1>
                        <p>Inicia sesión para consultar el estado de tus reservas, la fianza y los detalles de tu cumpleaños.</p>
                        <div className="panel-hero__ctas">
                            <Button href="/login" variant="primary" size="lg">Iniciar sesión</Button>
                            <Button href="/register" variant="outline" size="lg">Crear cuenta</Button>
                        </div>
                        <p className="panel-hero__note">Usa el mismo email con el que hiciste la reserva.</p>
                    </div>
                </div>

                <section className="panel-cta">
                    <div className="container panel-cta__inner">
                        <div>
                            <h2>¿Aún no tienes reserva?</h2>
                            <p>Escríbenos y te ayudamos a organizar el cumpleaños perfecto.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">WhatsApp</Button>
                            <Button href="tel:684657760" variant="ghost" size="lg">Llamar</Button>
                        </div>
                    </div>
                </section>
            </>
        )
    }

    // ── Autenticado: sus reservas ────────────────────────────────────────────
    return (
        <>
            <Seo title="Mis reservas | Indiana Bill Gijón" description="Consulta el estado de tus reservas en Indiana Bill Gijón." path="/panel" />
            <div className="panel-hero panel-hero--compact">
                <div className="container">
                    <h1>Hola, {user?.username}</h1>
                    <p>Aquí tienes tus reservas en Indiana Bill.</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {fianzaParam === 'ok' && <div className="panel-banner panel-banner--ok">¡Fianza recibida! Tu reserva queda confirmada. ¡Te esperamos!</div>}
                    {fianzaParam === 'cancelada' && <div className="panel-banner panel-banner--cancel">El pago se canceló. Puedes intentarlo de nuevo o pagar en el local.</div>}
                    {payError && <div className="panel-banner panel-banner--cancel">{payError}</div>}

                    {user?.verificado === false && (
                        <div className="panel-empty-box">
                            <h2>Verifica tu email</h2>
                            <p>Te enviamos un email a <strong>{user?.email}</strong> para activar tu cuenta. Pulsa el enlace del correo para ver tus reservas.</p>
                            <div className="panel-empty-box__ctas">
                                <button className="reserva-pay-btn" onClick={reenviarVerificacion} disabled={resendMsg === 'enviando'}>
                                    {resendMsg === 'enviando' ? 'Enviando…' : 'Reenviar email de verificación'}
                                </button>
                            </div>
                            {resendMsg === 'ok' && <p className="panel-banner panel-banner--ok" style={{ marginTop: '1rem' }}>Email reenviado. Revisa tu bandeja.</p>}
                            {resendMsg === 'error' && <p className="panel-banner panel-banner--cancel" style={{ marginTop: '1rem' }}>No se pudo reenviar. Inténtalo más tarde.</p>}
                        </div>
                    )}

                    {user?.verificado !== false && loadingRes && <p className="panel-empty">Cargando tus reservas…</p>}

                    {user?.verificado !== false && !loadingRes && reservas.length === 0 && (
                        <div className="panel-empty-box">
                            <h2>No encontramos reservas con tu email</h2>
                            <p>Si acabas de reservar o usaste otro email, escríbenos y lo revisamos.</p>
                            <div className="panel-empty-box__ctas">
                                <Button href={WA} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">WhatsApp</Button>
                                <Button href="/cumpleanos" variant="outline" size="lg">Reservar cumpleaños</Button>
                            </div>
                        </div>
                    )}

                    {user?.verificado !== false && !loadingRes && reservas.length > 0 && (
                        <div className="panel-reservas">
                            {reservas.map((r) => {
                                const est = ESTADO_INFO[r.estado] || { label: r.estado, color: '#666' }
                                return (
                                    <div key={r.id} className="reserva-card">
                                        <div className="reserva-card__top">
                                            <span className="reserva-card__icon">{SERVICIO_ICON[r.servicio] || '🎈'}</span>
                                            <div className="reserva-card__title">
                                                <h3>{r.servicio === 'cumpleanos' ? 'Cumpleaños' : (r.servicio || 'Reserva')}{r.nombre_nino ? ` de ${r.nombre_nino}` : ''}</h3>
                                                {r.fecha_cumpleanos && <span className="reserva-card__fecha">{new Date(r.fecha_cumpleanos).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>}
                                            </div>
                                            <span className="reserva-card__estado" style={{ background: est.color }}>{est.label}</span>
                                        </div>

                                        <div className="reserva-card__meta">
                                            {r.num_ninos != null && <span>{r.num_ninos} niños</span>}
                                            {r.num_invitados_final != null && <span>{r.num_invitados_final} confirmados</span>}
                                        </div>

                                        <div className="reserva-card__fianza">
                                            {r.fianza_pagada ? (
                                                <span className="reserva-fianza reserva-fianza--ok">Fianza pagada — reserva confirmada</span>
                                            ) : (
                                                <div className="reserva-fianza reserva-fianza--pending">
                                                    <span>Fianza pendiente ({r.fianza_importe ?? 20}€) para confirmar la reserva</span>
                                                    {pagosConfig.configured ? (
                                                        <button className="reserva-pay-btn" disabled={payingId === r.id} onClick={() => pagarFianza(r.id)}>
                                                            {payingId === r.id ? 'Abriendo pago…' : `Pagar fianza (${r.fianza_importe ?? 20}€)`}
                                                        </button>
                                                    ) : (
                                                        <a className="reserva-pay-btn reserva-pay-btn--wa" href={WA} target="_blank" rel="noopener noreferrer">Pagar / consultar por WhatsApp</a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    <div className="panel-account">
                        <h4>Tu cuenta</h4>
                        <p><strong>Usuario:</strong> {user?.username}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <div className="panel-account__actions">
                            <Link to="/profile" className="panel-account__link">Editar perfil</Link>
                            <button onClick={logout} className="panel-account__logout">Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
