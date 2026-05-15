import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AdminPage.css'

const ESTADOS_LEAD = ['nuevo','pendiente','contactado','reserva_iniciada','reserva_confirmada','completado','perdido']
const ESTADO_LABELS = { nuevo:'Nuevo', pendiente:'Pendiente', contactado:'Contactado', reserva_iniciada:'Reserva iniciada', reserva_confirmada:'Reserva confirmada', completado:'Completado', perdido:'Perdido' }
const ESTADO_COLORS = { nuevo:'#2563eb', pendiente:'#d97706', contactado:'#7c3aed', reserva_iniciada:'#0891b2', reserva_confirmada:'#16a34a', completado:'#15803d', perdido:'#dc2626' }

const ESTADO_ICONS = { nuevo:'🆕', pendiente:'⏳', contactado:'📞', reserva_iniciada:'📝', reserva_confirmada:'✅', completado:'🎉', perdido:'❌' }

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

  const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    if (user?.role !== 'admin') {
      setFatalError('No tienes permisos de administrador')
      setLoading(false)
      return
    }
    fetchUsers()
    fetchLeads()
    fetchStats()
  }, [user])

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setLeads(await res.json())
    } catch {}
  }

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/api/leads/stats/resumen`, { headers: { Authorization: `Bearer ${token}` } })
      if (res.ok) setStats(await res.json())
    } catch {}
  }

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
        setMessage('Estado actualizado')
        setTimeout(() => setMessage(''), 2500)
      }
    } catch {}
  }

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        setFatalError('Error al cargar usuarios')
      }
    } catch (error) {
      setFatalError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const updateUserRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      })

      if (response.ok) {
        setOpError('')
        setMessage('Rol actualizado correctamente')
        fetchUsers()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setOpError('Error al actualizar rol')
        setTimeout(() => setOpError(''), 3000)
      }
    } catch (error) {
      setOpError('Error de conexión')
      setTimeout(() => setOpError(''), 3000)
    }
  }

  const deleteUser = async (userId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este usuario?')) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        setOpError('')
        setMessage('Usuario eliminado correctamente')
        fetchUsers()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setOpError('Error al eliminar usuario')
        setTimeout(() => setOpError(''), 3000)
      }
    } catch (error) {
      setOpError('Error de conexión')
      setTimeout(() => setOpError(''), 3000)
    }
  }

  const updateUserPassword = async () => {
    if (!newPassword || !selectedUser) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API}/admin/users/${selectedUser.id}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ new_password: newPassword })
      })

      if (response.ok) {
        setOpError('')
        setMessage('Contraseña actualizada correctamente')
        setShowPasswordModal(false)
        setNewPassword('')
        setSelectedUser(null)
        setTimeout(() => setMessage(''), 3000)
      } else {
        setOpError('Error al actualizar contraseña')
        setTimeout(() => setOpError(''), 3000)
      }
    } catch (error) {
      setOpError('Error de conexión')
      setTimeout(() => setOpError(''), 3000)
    }
  }

  if (loading) {
    return <div className="admin-page">Cargando...</div>
  }

  if (fatalError) {
    return <div className="admin-page" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'1.1rem'}}>⚠️ {fatalError}</div>
  }

  if (user?.role !== 'admin') {
    return <div className="admin-page" style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:'1.1rem'}}>⛔ Acceso denegado</div>
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
            📊 Dashboard
          </button>
          <button className={`admin-tab${tab === 'leads' ? ' admin-tab--active' : ''}`} onClick={() => setTab('leads')}>
            📋 Leads CRM ({leads.length})
          </button>
          <button className={`admin-tab${tab === 'users' ? ' admin-tab--active' : ''}`} onClick={() => setTab('users')}>
            👥 Usuarios
          </button>
        </div>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div className="admin-dashboard">
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
            </div>

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
                <h3 className="dash-card__title">🎂 Próximos cumpleaños (30 días)</h3>
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
                      <a href={`https://api.whatsapp.com/send?phone=34${c.telefono.replace(/\D/g,'')}&text=Hola%20${encodeURIComponent(c.nombre)}%2C%20te%20contactamos%20desde%20Indiana%20Bill%20para%20confirmar%20los%20detalles%20del%20cumplea%C3%B1os%20del%20${encodeURIComponent(c.fecha_cumpleanos)}.`} target="_blank" rel="noopener noreferrer" className="lead-btn lead-btn--wa" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}>💬</a>
                      <a href={`tel:${c.telefono}`} className="lead-btn lead-btn--call" style={{padding:'0.25rem 0.6rem',fontSize:'0.8rem'}}>📞</a>
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
            {leads.length === 0 && <p style={{color:'#888',padding:'2rem',textAlign:'center'}}>Todavía no hay leads. Los formularios de la web los irán añadiendo aquí.</p>}
            {leads.map((lead) => (
              <div key={lead.id} className="lead-item">
                <div className="lead-item__header" onClick={() => setExpandedLead(expandedLead === lead.id ? null : lead.id)}>
                  <div className="lead-item__info">
                    <span className="lead-item__name">{lead.nombre}</span>
                    <span className="lead-item__tel"><a href={`tel:${lead.telefono}`}>{lead.telefono}</a></span>
                    {lead.fecha_cumpleanos && <span className="lead-item__fecha">📅 {lead.fecha_cumpleanos}</span>}
                    {lead.num_ninos && <span className="lead-item__ninos">👦 {lead.num_ninos} niños</span>}
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
                    {lead.num_invitados && <p><strong>Invitados:</strong> {lead.num_invitados}</p>}
                    {lead.comentarios && <p><strong>Comentarios:</strong> {lead.comentarios}</p>}
                    <p><strong>Servicio:</strong> {lead.servicio} · <strong>Origen:</strong> {lead.origen}</p>
                    <div className="lead-item__actions">
                      <a href={`https://api.whatsapp.com/send?phone=34${lead.telefono.replace(/\D/g,'')}&text=Hola%20${encodeURIComponent(lead.nombre)}%2C%20te%20contacto%20desde%20Indiana%20Bill%20sobre%20tu%20solicitud%20de%20cumplea%C3%B1os.`} target="_blank" rel="noopener noreferrer" className="lead-btn lead-btn--wa">💬 WhatsApp</a>
                      <a href={`tel:${lead.telefono}`} className="lead-btn lead-btn--call">📞 Llamar</a>
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
                      🔐
                    </button>
                    <button
                      onClick={() => deleteUser(userItem.id)}
                      disabled={userItem.id === user.id}
                      className="btn-delete"
                      title="Eliminar usuario"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        )} {/* end tab === 'users' */}

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
