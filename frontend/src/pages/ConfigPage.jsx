import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import './ConfigPage.css'

export default function ConfigPage() {
  const { user } = useAuth()
  const { theme, language, fontSize, updateTheme, updateLanguage, updateFontSize, resetPreferences } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  useEffect(() => {
    // Load other preferences from localStorage
    const savedNotifications = localStorage.getItem('notifications') !== 'false'
    const savedAutoSave = localStorage.getItem('autoSave') !== 'false'

    setNotifications(savedNotifications)
    setAutoSave(savedAutoSave)
  }, [])

  const handleNotificationsChange = (value) => {
    setNotifications(value)
    localStorage.setItem('notifications', value)
  }

  const handleAutoSaveChange = (value) => {
    setAutoSave(value)
    localStorage.setItem('autoSave', value)
  }

  const resetToDefaults = () => {
    resetPreferences()
    setNotifications(true)
    setAutoSave(true)
    
    // Clear other localStorage items
    localStorage.removeItem('notifications')
    localStorage.removeItem('autoSave')
  }

  return (
    <div className="config-page">
      <div className="config-container">
        <div className="config-header">
          <h1>Configuración</h1>
          <p>Personaliza tu experiencia en Indiana Bill</p>
        </div>

        <div className="config-grid">
          {/* Theme Settings */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon">🎨</div>
              <div>
                <h3>Apariencia</h3>
                <p>Elige el tema que prefieras</p>
              </div>
            </div>
            <div className="config-content">
              <div className="theme-options">
                <div 
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => updateTheme('light')}
                >
                  <div className="theme-preview light">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-card"></div>
                    </div>
                  </div>
                  <span>Claro</span>
                </div>
                <div 
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => updateTheme('dark')}
                >
                  <div className="theme-preview dark">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-card"></div>
                    </div>
                  </div>
                  <span>Oscuro</span>
                </div>
                <div 
                  className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
                  onClick={() => updateTheme('auto')}
                >
                  <div className="theme-preview auto">
                    <div className="preview-header"></div>
                    <div className="preview-content">
                      <div className="preview-card"></div>
                    </div>
                  </div>
                  <span>Automático</span>
                </div>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon">🌐</div>
              <div>
                <h3>Idioma</h3>
                <p>Selecciona tu idioma preferido</p>
              </div>
            </div>
            <div className="config-content">
              <div className="select-wrapper">
                <select 
                  value={language} 
                  onChange={(e) => updateLanguage(e.target.value)}
                  className="config-select"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* Font Size Settings */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon">📝</div>
              <div>
                <h3>Tamaño de Fuente</h3>
                <p>Ajusta el tamaño del texto</p>
              </div>
            </div>
            <div className="config-content">
              <div className="font-size-options">
                <div 
                  className={`font-size-option ${fontSize === 'small' ? 'active' : ''}`}
                  onClick={() => updateFontSize('small')}
                >
                  <span className="font-preview small">Aa</span>
                  <span>Pequeño</span>
                </div>
                <div 
                  className={`font-size-option ${fontSize === 'medium' ? 'active' : ''}`}
                  onClick={() => updateFontSize('medium')}
                >
                  <span className="font-preview medium">Aa</span>
                  <span>Mediano</span>
                </div>
                <div 
                  className={`font-size-option ${fontSize === 'large' ? 'active' : ''}`}
                  onClick={() => updateFontSize('large')}
                >
                  <span className="font-preview large">Aa</span>
                  <span>Grande</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="config-card">
            <div className="config-card-header">
              <div className="config-icon">🔔</div>
              <div>
                <h3>Notificaciones</h3>
                <p>Administra tus preferencias de notificación</p>
              </div>
            </div>
            <div className="config-content">
              <div className="toggle-options">
                <div className="toggle-item">
                  <span>Notificaciones por email</span>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={notifications}
                      onChange={(e) => handleNotificationsChange(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="toggle-item">
                  <span>Guardado automático</span>
                  <label className="toggle">
                    <input 
                      type="checkbox" 
                      checked={autoSave}
                      onChange={(e) => handleAutoSaveChange(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Section */}
        <div className="config-info">
          <div className="info-card">
            <h4>Información de la cuenta</h4>
            <div className="info-item">
              <span className="info-label">Usuario:</span>
              <span className="info-value">{user?.username}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rol:</span>
              <span className="info-value">{user?.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="config-actions">
          <button onClick={resetToDefaults} className="action-button secondary">
            Restablecer Valores
          </button>
          <Link to="/dashboard" className="action-button primary">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
