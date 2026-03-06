import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './DashboardPage.css'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Bienvenido, {user?.username}!</h1>
          <p>Este es tu panel de control personal</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon">👤</div>
            <h3>Mi Perfil</h3>
            <p>Actualiza tu información personal y descripción</p>
            <Link to="/profile" className="card-button">
              Gestionar Perfil
            </Link>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">🎉</div>
            <h3>Mis Reservas</h3>
            <p>Consulta y gestiona tus reservas de fiestas</p>
            <button className="card-button" disabled>
              Próximamente
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">📋</div>
            <h3>Historial</h3>
            <p>Revisa tu historial de actividades y reservas</p>
            <button className="card-button" disabled>
              Próximamente
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon">⚙️</div>
            <h3>Configuración</h3>
            <p>Administra tus preferencias y configuración</p>
            <Link to="/config" className="card-button">
              Configurar
            </Link>
          </div>
        </div>

        <div className="dashboard-info">
          <div className="info-card">
            <h4>Información de tu cuenta</h4>
            <div className="info-item">
              <span className="info-label">Usuario:</span>
              <span className="info-value">{user?.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Miembro desde:</span>
              <span className="info-value">
                {new Date(user?.created_at).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/" className="action-button secondary">
            ← Volver al Inicio
          </Link>
          <button onClick={logout} className="action-button danger">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
