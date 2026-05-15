/**
 * cleanThemeStorage.js - Utilidad para limpiar temas "auto" del localStorage
 * Este script se puede ejecutar una vez para migrar usuarios del tema "auto" a "light"
 */

export const cleanAutoThemes = () => {
  console.log('🧹 Limpiando temas "auto" del localStorage...')
  
  // Obtener todas las claves del localStorage
  const keys = Object.keys(localStorage)
  
  let cleanedCount = 0
  
  keys.forEach(key => {
    if (key.startsWith('theme_')) {
      const value = localStorage.getItem(key)
      if (value === 'auto') {
        // Reemplazar 'auto' con 'light'
        localStorage.setItem(key, 'light')
        cleanedCount++
        console.log(`✅ Tema "auto" reemplazado con "light" para: ${key}`)
      }
    }
  })
  
  if (cleanedCount > 0) {
    console.log(`🎉 Se limpiaron ${cleanedCount} temas "auto"`)
  } else {
    console.log('ℹ️  No se encontraron temas "auto" para limpiar')
  }
  
  return cleanedCount
}

// Función para verificar el tema actual de todos los usuarios
export const checkAllThemes = () => {
  console.log('🔍 Verificando temas guardados...')
  
  const keys = Object.keys(localStorage)
  const themeKeys = keys.filter(key => key.startsWith('theme_'))
  
  const themes = {}
  
  themeKeys.forEach(key => {
    const value = localStorage.getItem(key)
    themes[key] = value
  })
  
  console.log('📊 Temas guardados:', themes)
  return themes
}

// Auto-ejecutar la limpieza si se importa este script
if (typeof window !== 'undefined') {
  // Solo ejecutar en el navegador
  cleanAutoThemes()
}
