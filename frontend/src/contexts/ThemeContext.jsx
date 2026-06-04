import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { cleanAutoThemes } from '../utils/cleanThemeStorage'

const ThemeContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  
  // Limpiar temas "auto" al inicio
  useEffect(() => {
    cleanAutoThemes()
  }, [])
  
  const [theme, setTheme] = useState(() => {
    // Always default to light theme initially
    const savedTheme = localStorage.getItem(`theme_${user?.id || 'guest'}`)
    
    // If user has saved 'auto', convert it to 'light' for now
    if (savedTheme === 'auto') {
      return 'light'
    }
    
    // Return saved theme or default to light
    return savedTheme || 'light'
  })
  
  const [language, setLanguage] = useState(() => {
    // If no user is authenticated, always use Spanish
    if (!isAuthenticated) {
      return 'es'
    }
    // If user is authenticated, use their saved language
    return localStorage.getItem(`language_${user?.id || 'guest'}`) || 'es'
  })
  
  const [fontSize, setFontSize] = useState(() => {
    // If no user is authenticated, always use medium
    if (!isAuthenticated) {
      return 'medium'
    }
    // If user is authenticated, use their saved font size
    return localStorage.getItem(`fontSize_${user?.id || 'guest'}`) || 'medium'
  })

  // Render-time state update when auth changes — React-recommended pattern
  // to avoid calling setState inside a useEffect (which causes cascading renders).
  const [prevUserId, setPrevUserId] = useState(user?.id)
  const [prevIsAuth, setPrevIsAuth] = useState(isAuthenticated)

  if (prevUserId !== user?.id || prevIsAuth !== isAuthenticated) {
    setPrevUserId(user?.id)
    setPrevIsAuth(isAuthenticated)

    if (!isAuthenticated || !user) {
      setTheme('light')
      setLanguage('es')
      setFontSize('medium')
    } else {
      const savedTheme = localStorage.getItem(`theme_${user.id}`)
      const savedLanguage = localStorage.getItem(`language_${user.id}`)
      const savedFontSize = localStorage.getItem(`fontSize_${user.id}`)
      const finalTheme = savedTheme === 'auto' ? 'light' : (savedTheme || 'light')
      setTheme(finalTheme)
      setLanguage(savedLanguage || 'es')
      setFontSize(savedFontSize || 'medium')
    }
  }

  useEffect(() => {
    // Apply theme to document whenever it changes
    const root = document.documentElement
    
    // Only apply 'light' or 'dark' themes
    const actualTheme = theme === 'auto' ? 'light' : theme
    root.setAttribute('data-theme', actualTheme)
    
    // Apply font size
    root.setAttribute('data-font-size', fontSize)
    
    // Save to localStorage with user-specific key if authenticated
    if (isAuthenticated && user) {
      localStorage.setItem(`theme_${user.id}`, theme)
      localStorage.setItem(`fontSize_${user.id}`, fontSize)
    }
  }, [theme, fontSize, isAuthenticated, user])

  useEffect(() => {
    // Save language to localStorage with user-specific key if authenticated
    if (isAuthenticated && user) {
      localStorage.setItem(`language_${user.id}`, language)
    }
  }, [language, isAuthenticated, user])

  const updateTheme = (newTheme) => {
    // Convert 'auto' to 'light' for now
    const finalTheme = newTheme === 'auto' ? 'light' : newTheme
    setTheme(finalTheme)
  }

  const updateLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  const updateFontSize = (newFontSize) => {
    setFontSize(newFontSize)
  }

  const resetPreferences = () => {
    setTheme('light')
    setLanguage('es')
    setFontSize('medium')
    
    // Clear user-specific localStorage if authenticated
    if (isAuthenticated && user) {
      localStorage.removeItem(`theme_${user.id}`)
      localStorage.removeItem(`language_${user.id}`)
      localStorage.removeItem(`fontSize_${user.id}`)
    }
  }

  const value = {
    theme,
    language,
    fontSize,
    updateTheme,
    updateLanguage,
    updateFontSize,
    resetPreferences
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
