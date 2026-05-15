import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import './ProfilePage.css'

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const [username, setUsername] = useState(user?.username || '')
  const [description, setDescription] = useState(user?.description || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const updateData = {}
    if (username !== user?.username) {
      updateData.username = username
    }
    if (description !== user?.description) {
      updateData.description = description
    }

    if (Object.keys(updateData).length === 0) {
      setError('No hay cambios para guardar')
      setLoading(false)
      return
    }

    const result = await updateProfile(updateData)
    
    if (result.success) {
      setSuccess('Perfil actualizado correctamente')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mi Perfil</h1>
          <p>Gestiona tu información personal</p>
        </div>

        <div className="profile-content">
          <div className="profile-form-card">
            <h2>Editar Información</h2>
            
            {error && (
              <div className="profile-error">
                {error}
              </div>
            )}

            {success && (
              <div className="profile-success">
                {success}
              </div>
            )}

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                  maxLength="50"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={user?.email || ''}
                  disabled
                  className="disabled-input"
                />
                <small className="form-help">El email no se puede cambiar</small>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength="500"
                  placeholder="Cuéntanos sobre ti..."
                />
                <small className="form-help">
                  {description.length}/500 caracteres
                </small>
              </div>

              <button 
                type="submit" 
                className="profile-button"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>

          <div className="profile-info-card">
            <h2>Información de la Cuenta</h2>
            
            <div className="info-item">
              <span className="info-label">ID de Usuario:</span>
              <span className="info-value">#{user?.id}</span>
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
            
            <div className="info-item">
              <span className="info-label">Última actualización:</span>
              <span className="info-value">
                {user?.updated_at 
                  ? new Date(user.updated_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })
                  : 'Nunca'
                }
              </span>
            </div>

            <div className="profile-actions">
              <Link to="/dashboard" className="action-button secondary">
                ← Volver al Dashboard
              </Link>
              <button onClick={logout} className="action-button danger">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
