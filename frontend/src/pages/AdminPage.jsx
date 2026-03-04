import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './AdminPage.css'

export default function AdminPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')

  const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

  useEffect(() => {
    if (user?.role !== 'admin') {
      setError('No tienes permisos de administrador')
      setLoading(false)
      return
    }
    fetchUsers()
  }, [user])

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
        setError('Error al cargar usuarios')
      }
    } catch (error) {
      setError('Error de conexión')
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
        setMessage('Rol actualizado correctamente')
        fetchUsers()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Error al actualizar rol')
      }
    } catch (error) {
      setError('Error de conexión')
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
        setMessage('Usuario eliminado correctamente')
        fetchUsers()
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Error al eliminar usuario')
      }
    } catch (error) {
      setError('Error de conexión')
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
        setMessage('Contraseña actualizada correctamente')
        setShowPasswordModal(false)
        setNewPassword('')
        setSelectedUser(null)
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Error al actualizar contraseña')
      }
    } catch (error) {
      setError('Error de conexión')
    }
  }

  if (loading) {
    return <div className="admin-page">Cargando...</div>
  }

  if (error) {
    return <div className="admin-page">Error: {error}</div>
  }

  if (user?.role !== 'admin') {
    return <div className="admin-page">Acceso denegado</div>
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Gestión de usuarios del sistema</p>
        </div>

        {message && <div className="admin-message success">{message}</div>}
        {error && <div className="admin-message error">{error}</div>}

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
