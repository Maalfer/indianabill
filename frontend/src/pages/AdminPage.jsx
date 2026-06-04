import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AdminPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const ESTADOS_LEAD = ['consulta_recibida','informacion_enviada','interesado','disponibilidad_solicitada','disponibilidad_confirmada','datos_recibidos','pendiente_llamada','pendiente_gestion','pendiente_fianza','pendiente_fianza_presencial','fianza_recibida','reserva_confirmada','pendiente_numero_final','confirmacion_final','celebrado','cancelado','no_convertido']
const ESTADO_LABELS = {
  consulta_recibida:'Consulta recibida', informacion_enviada:'Información enviada', interesado:'Interesado',
  disponibilidad_solicitada:'Disponibilidad solicitada', disponibilidad_confirmada:'Disponibilidad confirmada',
  datos_recibidos:'Datos recibidos', pendiente_llamada:'Pendiente llamada', pendiente_gestion:'Pendiente gestión',
  pendiente_fianza:'Pendiente fianza', pendiente_fianza_presencial:'Fianza presencial', fianza_recibida:'Fianza recibida',
  reserva_confirmada:'Reserva confirmada', pendiente_numero_final:'Pendiente nº final', confirmacion_final:'Confirmación final',
  celebrado:'Celebrado', cancelado:'Cancelado', no_convertido:'No convertido',
}
const ESTADO_COLORS = {
  consulta_recibida:'#2563eb', informacion_enviada:'#3b82f6', interesado:'#6366f1',
  disponibilidad_solicitada:'#0891b2', disponibilidad_confirmada:'#0e7490', datos_recibidos:'#7c3aed',
  pendiente_llamada:'#d97706', pendiente_gestion:'#ea580c', pendiente_fianza:'#f59e0b',
  pendiente_fianza_presencial:'#f97316', fianza_recibida:'#65a30d', reserva_confirmada:'#16a34a',
  pendiente_numero_final:'#0d9488', confirmacion_final:'#059669', celebrado:'#15803d',
  cancelado:'#dc2626', no_convertido:'#6b7280',
}
const ESTADO_ICONS = {
  consulta_recibida:'📥', informacion_enviada:'📤', interesado:'👀', disponibilidad_solicitada:'🔎',
  disponibilidad_confirmada:'📅', datos_recibidos:'📝', pendiente_llamada:'📞', pendiente_gestion:'⏳',
  pendiente_fianza:'💶', pendiente_fianza_presencial:'🏬', fianza_recibida:'💰', reserva_confirmada:'✅',
  pendiente_numero_final:'🔢', confirmacion_final:'📋', celebrado:'🎉', cancelado:'❌', no_convertido:'🚫',
}

const ORIGENES = ['recomendacion','web','google_ads','meta_ads','instagram','tiktok','seo','cliente_recurrente','juego_libre','bono','martes_familia','otro']
const SERVICIOS = ['cumpleanos','fiestas_privadas','juego_libre','bono','martes_familia','otro']
const METODOS_FIANZA = { '':'—', sms:'Enlace SMS', efectivo:'Efectivo' }

const NEW_LEAD_INIT = { nombre:'', telefono:'', email:'', fecha_cumpleanos:'', num_ninos:'', nombre_nino:'', servicio:'cumpleanos', origen:'recomendacion', comentarios:'' }

export default function AdminPage() {
  const { user } = useAuth()
  const [tab, setTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [leads, setLeads] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fatalError, setFatalError] = useState('')  // blocks page render
  const [opError, setOpError] = useState('')         // inline operation error
  const [selectedUser, setSelectedUser] = useState(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [expandedLead, setExpandedLead] = useState(null)
  const [showNewLead, setShowNewLead] = useState(false)
  const [newLead, setNewLead] = useState(NEW_LEAD_INIT)
  const [savingNew, setSavingNew] = useState(false)
  const [pagosConfig, setPagosConfig] = useState({ configured: false })
  const [fianzaLinks, setFianzaLinks] = useState({})   // { leadId: url }
  const [generandoLink, setGenerandoLink] = useState(null)

  const msgTimerRef = useRef(null)

  const flash = useCallback((msg, isError = false) => {
    clearTimeout(msgTimerRef.current)
    if (isError) { setOpError(msg); setMessage('') }
    else { setMessage(msg); setOpError('') }
    msgTimerRef.current = setTimeout(() => { setOpError(''); setMessage('') }, 2500)
  }, [])

  useEffect(() => () => clearTimeout(msgTimerRef.current), [])

    useEffect(() => {
    if (user?.role !== 'admin') {
      setFatalError('No tienes permisos de administrador')
      setLoading(false)
      return
    }
    fetchUsers()
    fetchLeads()
    fetchStats()
    fetch(`${API}/api/pagos/config`)
      .then((r) => r.json())
      .then((d) => setPagosConfig(d))
      .catch(() => {})
  }, [user, fetchUsers, fetchLeads, fetchStats])

  const fetchLeads = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setLeads(await res.json())
    } catch {
      // Network error — leads stay stale, not critical for the admin UI
    }
  }, [])

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/stats/resumen`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setStats(await res.json())
    } catch {
      // Network error — stats stay stale, not critical
    }
  }, [])

  const updateLeadEstado = async (leadId, estado) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) {
        setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, estado } : l))
        flash('Estado actualizado')
      } else {
        flash('Error al actualizar estado', true)
      }
    } catch {
      flash('Error de conexión', true)
    }
  }

  const updateLeadFields = async (leadId, fields) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/${leadId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(fields),
      })
      if (res.ok) {
        const updated = await res.json()
        setLeads((prev) => prev.map((l) => l.id === leadId ? updated : l))
        flash('Guardado')
        fetchStats()
      } else {
        flash('Error al guardar', true)
      }
    } catch {
      flash('Error de conexión', true)
    }
  }

  const createLead = async (e) => {
    e.preventDefault()
    if (!newLead.nombre.trim() || !newLead.telefono.trim()) {
      flash('Nombre y teléfono son obligatorios', true)
      return
    }
    setSavingNew(true)
    try {
      const token = localStorage.getItem('token')
      const body = {
        ...newLead,
        num_ninos: newLead.num_ninos ? Number(newLead.num_ninos) : null,
        fecha_cumpleanos: newLead.fecha_cumpleanos || null,
      }
      const res = await fetch(`${API}/api/leads/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        flash('Reserva creada')
        setShowNewLead(false)
        setNewLead(NEW_LEAD_INIT)
        fetchLeads()
        fetchStats()
      } else {
        flash('Error al crear la reserva', true)
      }
    } catch {
      flash('Error de conexión', true)
    } finally {
      setSavingNew(false)
    }
  }

  const toggleFianza = (lead) => {
    const pagada = !lead.fianza_pagada
    updateLeadFields(lead.id, {
      fianza_pagada: pagada,
      fianza_fecha_pago: pagada ? new Date().toISOString().slice(0, 10) : '',
      ...(pagada && lead.estado !== 'celebrado' ? { estado: 'reserva_confirmada' } : {}),
    })
  }

  const [enviandoRecordatorios, setEnviandoRecordatorios] = useState(false)
  const enviarRecordatorios = async () => {
    setEnviandoRecordatorios(true)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/automation/reminders/run`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        flash('Error al enviar recordatorios', true)
      } else if (data.status === 'email_no_configurado') {
        flash('Email no configurado aún (faltan credenciales SMTP)', true)
      } else {
        flash(`Recordatorios: ${data.enviados_cliente} a clientes, ${data.pendientes} fianzas pendientes`)
      }
    } catch {
      flash('Error de conexión', true)
    } finally {
      setEnviandoRecordatorios(false)
    }
  }

  const generarEnlaceFianza = async (lead) => {
    setGenerandoLink(lead.id)
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/pagos/fianza/${lead.id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setFianzaLinks((prev) => ({ ...prev, [lead.id]: data.url }))
        flash('Enlace de fianza generado')
      } else {
        const err = await res.json().catch(() => ({}))
        flash(err.detail || 'No se pudo generar el enlace', true)
      }
    } catch {
      flash('Error de conexión', true)
    } finally {
      setGenerandoLink(null)
    }
  }

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setUsers(await res.json())
      } else {
        setFatalError('Error al cargar usuarios')
      }
    } catch {
      setFatalError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }, [])

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ role: newRole }),
      })
      if (res.ok) {
        flash('Rol actualizado correctamente')
        fetchUsers()
      } else {
        flash('Error al actualizar rol', true)
      }
    } catch {
      flash('Error de conexión', true)
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        flash('Usuario eliminado correctamente')
        fetchUsers()
      } else {
        flash('Error al eliminar usuario', true)
      }
    } catch {
      flash('Error de conexión', true)
    }
  }

  const updateUserPassword = async () => {
    if (!newPassword || !selectedUser) return
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/admin/users/${selectedUser.id}/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ new_password: newPassword }),
      })
      if (res.ok) {
        flash('Contraseña actualizada correctamente')
        setShowPasswordModal(false)
        setNewPassword('')
        setSelectedUser(null)
      } else {
        flash('Error al actualizar contraseña', true)
      }
    } catch {
      flash('Error de conexión', true)
    }
  }

  if (loading) {
    return <div className="admin-page">Cargando...</div>
  }

  if (fatalError) {
    return <div className="admin-page" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'1.1rem'}}>{fatalError}</div>
  }

  if (user?.role !== 'admin') {
    return <div className="admin-page" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'1.1rem'}}>Acceso denegado</div>
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Dashboard · Leads CRM · Gestión de usuarios</p>
        </div>

        {message && <div className="admin-message success">{message}</div>}
        {opError && <div className="admin-message error">{opError}</div>}

        {/* TABS */}
        <div className="admin-tabs">
          <button className={`admin-tab${tab === 'dashboard' ? ' admin-tab--active' : ''}`} onClick={() => setTab('dashboard')}>
            Dashboard
          </button>
          <button className={`admin-tab${tab === 'leads' ? ' admin-tab--active' : ''}`} onClick={() => setTab('leads')}>
            Leads CRM ({leads.length})
          </button>
          <button className={`admin-tab${tab === 'users' ? ' admin-tab--active' : ''}`} onClick={() => setTab('users')}>
            Usuarios
          </button>
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="admin-dashboard">
            <div className="dash-toolbar">
              <button className="dash-reminders-btn" onClick={enviarRecordatorios} disabled={enviandoRecordatorios}>
                {enviandoRecordatorios ? 'Enviando…' : 'Enviar recordatorios de fianza ahora'}
              </button>
              <span className="dash-toolbar__hint">Se envían solos cada día a las 10:00</span>
            </div>
            {/* KPI Cards */}
            <div className="dash-kpis">
              <div className="dash-kpi">
                <span className="dash-kpi__icon">📋</span>
                <div>
                  <div className="dash-kpi__value">{stats?.total ?? '—'}</div>
                  <div className="dash-kpi__label">Total leads</div>
                </div>
              </div>
              <div className="dash-kpi dash-kpi--green">
                <span className="dash-kpi__icon">🗓️</span>
                <div>
                  <div className="dash-kpi__value">{stats?.esta_semana ?? '—'}</div>
                  <div className="dash-kpi__label">Esta semana</div>
                </div>
              </div>
              <div className="dash-kpi dash-kpi--blue">
                <span className="dash-kpi__icon">✅</span>
                <div>
                  <div className="dash-kpi__value">{stats?.por_estado?.reserva_confirmada ?? '—'}</div>
                  <div className="dash-kpi__label">Confirmadas</div>
                </div>
              </div>
              <div className="dash-kpi dash-kpi--yellow">
                <span className="dash-kpi__icon">🎂</span>
                <div>
                  <div className="dash-kpi__value">{stats?.proximos_cumpleanos?.length ?? '—'}</div>
                  <div className="dash-kpi__label">Cumpleaños próximos</div>
                </div>
              </div>
              <div className="dash-kpi dash-kpi--red">
                <span className="dash-kpi__icon">💶</span>
                <div>
                  <div className="dash-kpi__value">{stats?.pendientes_fianza ?? '—'}</div>
                  <div className="dash-kpi__label">Fianzas pendientes</div>
                </div>
              </div>
            </div>

            {/* Alertas de fianza ≤4 días */}
            {stats?.alertas_fianza?.length > 0 && (
              <div className="dash-alert">
                <h3 className="dash-alert__title">Fianza pendiente — cumpleaños en 4 días o menos</h3>
                {stats.alertas_fianza.map((a) => (
                  <div key={a.id} className="dash-alert__row">
                    <span className="dash-alert__badge">{a.dias_restantes === 0 ? 'HOY' : `${a.dias_restantes} día${a.dias_restantes === 1 ? '' : 's'}`}</span>
                    <span className="dash-alert__info"><strong>{a.nombre}</strong> · {a.fecha_cumpleanos}</span>
                    <span className="dash-alert__actions">
                      <a href={`https://api.whatsapp.com/send?phone=34${a.telefono.replace(/\D/g,'')}&text=${encodeURIComponent(`Hola ${a.nombre}, te recordamos desde Indiana Bill que para confirmar la reserva del cumpleaños hace falta abonar la fianza de 20€. ¡Gracias!`)}`} target="_blank" rel="noopener noreferrer" className="lead-btn lead-btn--wa" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}></a>
                      <a href={`tel:${a.telefono}`} className="lead-btn lead-btn--call" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}></a>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="dash-grid">
              {/* Estado pipeline */}
              <div className="dash-card">
                <h3 className="dash-card__title">Pipeline de leads</h3>
                {stats?.por_estado && ESTADOS_LEAD.map((e) => (
                  <div key={e} className="dash-pipeline-row">
                    <span className="dash-pipeline-icon">{ESTADO_ICONS[e]}</span>
                    <span className="dash-pipeline-label">{ESTADO_LABELS[e]}</span>
                    <div className="dash-pipeline-bar-wrap">
                      <div
                        className="dash-pipeline-bar"
                        style={{
                          width: stats.total ? `${Math.max(4, (stats.por_estado[e] / stats.total) * 100)}%` : '4%',
                          background: ESTADO_COLORS[e],
                        }}
                      />
                    </div>
                    <span className="dash-pipeline-count" style={{ color: ESTADO_COLORS[e] }}>
                      {stats.por_estado[e]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Próximos cumpleaños */}
              <div className="dash-card">
                <h3 className="dash-card__title">Próximos cumpleaños (30 días)</h3>
                {!stats?.proximos_cumpleanos?.length && (
                  <p className="dash-empty">No hay cumpleaños registrados en los próximos 30 días.</p>
                )}
                {stats?.proximos_cumpleanos?.map((c) => (
                  <div key={c.id} className="dash-birthday-row">
                    <div className="dash-birthday-date">
                      {new Date(c.fecha_cumpleanos).toLocaleDateString('es-ES', { day:'numeric', month:'short' })}
                    </div>
                    <div className="dash-birthday-info">
                      <strong>{c.nombre}</strong>
                      {c.nombre_nino && <span> · {c.nombre_nino}</span>}
                      {c.num_ninos && <span> · {c.num_ninos} niños</span>}
                    </div>
                    <div className="dash-birthday-actions">
                      <a href={`https://api.whatsapp.com/send?phone=34${c.telefono.replace(/\D/g,'')}&text=Hola%20${encodeURIComponent(c.nombre)}%2C%20te%20contactamos%20desde%20Indiana%20Bill%20para%20confirmar%20los%20detalles%20del%20cumplea%C3%B1os%20del%20${encodeURIComponent(c.fecha_cumpleanos)}.`} target="_blank" rel="noopener noreferrer" className="lead-btn lead-btn--wa" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}></a>
                      <a href={`tel:${c.telefono}`} className="lead-btn lead-btn--call" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}></a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads recientes */}
            <div className="dash-card" style={{margin:'0 2rem 2rem'}}>
              <h3 className="dash-card__title">Leads recientes</h3>
              <table className="dash-recent-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Servicio</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.recientes?.map((l) => (
                    <tr key={l.id}>
                      <td>{l.nombre}</td>
                      <td><a href={`tel:${l.telefono}`}>{l.telefono}</a></td>
                      <td>{l.servicio}</td>
                      <td>
                        <span className="dash-estado-badge" style={{ background: ESTADO_COLORS[l.estado] }}>
                          {ESTADO_LABELS[l.estado]}
                        </span>
                      </td>
                      <td>{l.created_at ? new Date(l.created_at).toLocaleDateString('es-ES') : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stats?.recientes?.length === 0 && <p className="dash-empty">Todavía no hay leads.</p>}
            </div>
          </div>
        )}

        {/* LEADS */}
        {tab === 'leads' && (
          <div className="leads-list">
            <div className="leads-toolbar">
              <button className="leads-new-btn" onClick={() => { setNewLead(NEW_LEAD_INIT); setShowNewLead(true) }}>
                Nueva reserva
              </button>
            </div>
            {leads.length === 0 && <p style={{color:'#888',padding:'2rem',textAlign:'center'}}>Todavía no hay reservas. Pulsa «Nueva reserva» para registrar una desde WhatsApp, teléfono o el local.</p>}
            {leads.map((lead) => (
              <div key={lead.id} className="lead-item">
                <div className="lead-item__header" onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}>
                  <div className="lead-item__info">
                    <span className="lead-item__name">{lead.nombre}</span>
                    <span className="lead-item__tel"><a href={`tel:${lead.telefono}`}>{lead.telefono}</a></span>
                    {lead.fecha_cumpleanos && <span className="lead-item__fecha">{lead.fecha_cumpleanos}</span>}
                    {lead.num_ninos && <span className="lead-item__ninos">{lead.num_ninos} niños</span>}
                    <span className={`fianza-chip${lead.fianza_pagada ? ' fianza-chip--ok' : ' fianza-chip--pending'}`}>
                      {lead.fianza_pagada ? 'Fianza pagada' : 'Fianza pendiente'}
                    </span>
                  </div>
                  <div className="lead-item__meta">
                    <span className="lead-item__date">{new Date(lead.created_at).toLocaleDateString('es-ES')}</span>
                    <select
                      value={lead.estado}
                      onChange={(e) => { e.stopPropagation(); updateLeadEstado(lead.id, e.target.value) }}
                      onClick={(e) => e.stopPropagation()}
                      className="lead-estado-select"
                      style={{ borderColor: ESTADO_COLORS[lead.estado] || '#999' }}
                    >
                      {ESTADOS_LEAD.map((e) => <option key={e} value={e}>{ESTADO_LABELS[e]}</option>)}
                    </select>
                    <span className="lead-expand">{expandedLead === lead.id ? '▲' : '▼'}</span>
                  </div>
                </div>
                {expandedLead === lead.id && (
                  <div className="lead-item__detail">
                    {lead.email && <p><strong>Email:</strong> <a href={`mailto:${lead.email}`}>{lead.email}</a></p>}
                    {lead.nombre_nino && <p><strong>Nombre del niño:</strong> {lead.nombre_nino}</p>}
                    {lead.num_invitados && <p><strong>Invitados (aprox.):</strong> {lead.num_invitados}</p>}
                    {lead.comentarios && <p><strong>Comentarios:</strong> {lead.comentarios}</p>}
                    <p><strong>Servicio:</strong> {lead.servicio} · <strong>Origen:</strong> {lead.origen}</p>

                    {/* ── Fianza / reserva ── */}
                    <div className="fianza-box">
                      <div className="fianza-box__head">
                        <strong>Fianza ({lead.fianza_importe ?? 20}€)</strong>
                        <button
                          className={`fianza-toggle${lead.fianza_pagada ? ' fianza-toggle--ok' : ''}`}
                          onClick={() => toggleFianza(lead)}
                        >
                          {lead.fianza_pagada ? 'Pagada — marcar pendiente' : 'Marcar como pagada'}
                        </button>
                      </div>
                      <div className="fianza-box__row">
                        <label>
                          Método
                          <select
                            value={lead.fianza_metodo || ''}
                            onChange={(e) => updateLeadFields(lead.id, { fianza_metodo: e.target.value })}
                          >
                            {Object.entries(METODOS_FIANZA).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                          </select>
                        </label>
                        <label>
                          Fecha de pago
                          <input
                            type="date"
                            value={lead.fianza_fecha_pago || ''}
                            onChange={(e) => updateLeadFields(lead.id, { fianza_fecha_pago: e.target.value })}
                          />
                        </label>
                        <label>
                          Nº final de invitados
                          <input
                            type="number"
                            min="0"
                            defaultValue={lead.num_invitados_final ?? ''}
                            onBlur={(e) => {
                              const v = e.target.value
                              if (String(lead.num_invitados_final ?? '') !== v) {
                                updateLeadFields(lead.id, { num_invitados_final: v ? Number(v) : null })
                              }
                            }}
                          />
                        </label>
                      </div>

                      {/* Enlace de pago de fianza (Stripe) */}
                      {!lead.fianza_pagada && (
                        <div className="fianza-link">
                          {pagosConfig.configured ? (
                            fianzaLinks[lead.id] ? (
                              <div className="fianza-link__ready">
                                <input className="fianza-link__url" readOnly value={fianzaLinks[lead.id]} onFocus={(e) => e.target.select()} />
                                <button className="fianza-link__btn" onClick={() => { navigator.clipboard?.writeText(fianzaLinks[lead.id]); flash('Enlace copiado') }}>Copiar</button>
                                <a className="lead-btn lead-btn--wa" target="_blank" rel="noopener noreferrer"
                                   href={`https://api.whatsapp.com/send?phone=34${lead.telefono.replace(/\D/g,'')}&text=${encodeURIComponent(`Hola ${lead.nombre}, para confirmar la reserva del cumpleaños en Indiana Bill puedes abonar la fianza de ${lead.fianza_importe ?? 20}€ aquí: ${fianzaLinks[lead.id]} ¡Gracias!`)}`}>Enviar</a>
                              </div>
                            ) : (
                              <button className="fianza-link__gen" disabled={generandoLink === lead.id} onClick={() => generarEnlaceFianza(lead)}>
                                {generandoLink === lead.id ? 'Generando…' : `Generar enlace de fianza (${lead.fianza_importe ?? 20}€)`}
                              </button>
                            )
                          ) : (
                            <p className="fianza-link__off">Pagos online no activos — cobra la fianza en efectivo o configura Stripe.</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="lead-item__actions">
                      <a href={`https://api.whatsapp.com/send?phone=34${lead.telefono.replace(/\D/g,'')}&text=Hola%20${encodeURIComponent(lead.nombre)}%2C%20te%20contacto%20desde%20Indiana%20Bill%20sobre%20tu%20reserva.`} target="_blank" rel="noopener noreferrer" className="lead-btn lead-btn--wa">WhatsApp</a>
                      <a href={`tel:${lead.telefono}`} className="lead-btn lead-btn--call">Llamar</a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* USERS */}
        {tab === 'users' && (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Descripción</th>
                <th>Fecha de creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userItem) => (
                <tr key={userItem.id} className={userItem.id === user.id ? 'current-user' : ''}>
                  <td>{userItem.id}</td>
                  <td>{userItem.username}</td>
                  <td>{userItem.email}</td>
                  <td>
                    <select
                      value={userItem.role}
                      onChange={(e) => updateUserRole(userItem.id, e.target.value)}
                      disabled={userItem.id === user.id}
                      className="role-select"
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td>{userItem.description || '-'}</td>
                  <td>{new Date(userItem.created_at).toLocaleDateString()}</td>
                  <td className="actions-cell">
                    <button
                      onClick={() => {
                        setSelectedUser(userItem)
                        setShowPasswordModal(true)
                      }}
                      className="btn-password"
                      title="Cambiar contraseña"
                    >
                      
                    </button>
                    <button
                      onClick={() => deleteUser(userItem.id)}
                      disabled={userItem.id === user.id}
                      className="btn-delete"
                      title="Eliminar usuario"
                    >
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        )} {/* end tab === 'users' */}

        {showNewLead && (
          <div className="modal-overlay" onClick={() => setShowNewLead(false)}>
            <div className="modal modal--wide" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Nueva reserva / lead</h3>
                <button onClick={() => setShowNewLead(false)} className="close-btn">×</button>
              </div>
              <form onSubmit={createLead}>
                <div className="modal-body newlead-grid">
                  <label className="newlead-field">Nombre *
                    <input type="text" value={newLead.nombre} onChange={(e) => setNewLead({ ...newLead, nombre: e.target.value })} required />
                  </label>
                  <label className="newlead-field">Teléfono *
                    <input type="tel" value={newLead.telefono} onChange={(e) => setNewLead({ ...newLead, telefono: e.target.value })} required />
                  </label>
                  <label className="newlead-field">Email
                    <input type="email" value={newLead.email} onChange={(e) => setNewLead({ ...newLead, email: e.target.value })} />
                  </label>
                  <label className="newlead-field">Fecha del cumpleaños
                    <input type="date" value={newLead.fecha_cumpleanos} onChange={(e) => setNewLead({ ...newLead, fecha_cumpleanos: e.target.value })} />
                  </label>
                  <label className="newlead-field">Nº de niños
                    <input type="number" min="0" value={newLead.num_ninos} onChange={(e) => setNewLead({ ...newLead, num_ninos: e.target.value })} />
                  </label>
                  <label className="newlead-field">Nombre del cumpleañero
                    <input type="text" value={newLead.nombre_nino} onChange={(e) => setNewLead({ ...newLead, nombre_nino: e.target.value })} />
                  </label>
                  <label className="newlead-field">Servicio
                    <select value={newLead.servicio} onChange={(e) => setNewLead({ ...newLead, servicio: e.target.value })}>
                      {SERVICIOS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </label>
                  <label className="newlead-field">Origen
                    <select value={newLead.origen} onChange={(e) => setNewLead({ ...newLead, origen: e.target.value })}>
                      {ORIGENES.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="newlead-field newlead-field--full">Comentarios
                    <textarea rows={3} value={newLead.comentarios} onChange={(e) => setNewLead({ ...newLead, comentarios: e.target.value })} />
                  </label>
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowNewLead(false)} className="btn-cancel">Cancelar</button>
                  <button type="submit" className="btn-confirm" disabled={savingNew}>{savingNew ? 'Guardando…' : 'Crear reserva'}</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showPasswordModal && selectedUser && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Cambiar Contraseña</h3>
                <button onClick={() => setShowPasswordModal(false)} className="close-btn">×</button>
              </div>
              <div className="modal-body">
                <p>Usuario: <strong>{selectedUser.username}</strong></p>
                <p>Email: <strong>{selectedUser.email}</strong></p>
                <div className="form-group">
                  <label>Nueva Contraseña:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Ingrese nueva contraseña"
                    className="password-input"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={() => setShowPasswordModal(false)} className="btn-cancel">
                  Cancelar
                </button>
                <button onClick={updateUserPassword} className="btn-confirm">
                  Actualizar Contraseña
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
