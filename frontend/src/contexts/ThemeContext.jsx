import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  
  const [theme, setTheme] = useState(() => {
    // If no user is authenticated, always use light theme
    if (!isAuthenticated) {
      return 'light'
    }
    // If user is authenticated, use their saved theme
    return localStorage.getItem(`theme_${user?.id || 'guest'}`) || 'light'
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

  useEffect(() => {
    // When authentication status changes, reset theme accordingly
    if (!isAuthenticated) {
      // No user authenticated - always use light theme
      setTheme('light')
      setLanguage('es')
      setFontSize('medium')
    } else {
      // User authenticated - load their saved preferences
      const savedTheme = localStorage.getItem(`theme_${user?.id || 'guest'}`) || 'light'
      const savedLanguage = localStorage.getItem(`language_${user?.id || 'guest'}`) || 'es'
      const savedFontSize = localStorage.getItem(`fontSize_${user?.id || 'guest'}`) || 'medium'
      
      setTheme(savedTheme)
      setLanguage(savedLanguage)
      setFontSize(savedFontSize)
    }
  }, [isAuthenticated, user])

  useEffect(() => {
    // Apply theme to document whenever it changes
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    
    // Apply font size
    root.setAttribute('data-font-size', fontSize)
    
    // Save to localStorage with user-specific key if authenticated, otherwise don't save
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
    setTheme(newTheme)
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
