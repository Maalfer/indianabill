/**
 * cleanThemeStorage.js — migra valores de tema 'auto' a 'light' en localStorage.
 * Se ejecuta una sola vez al cargar la app desde ThemeProvider.
 */

export const cleanAutoThemes = () => {
  const keys = Object.keys(localStorage)
  keys.forEach(key => {
    if (key.startsWith('theme_') && localStorage.getItem(key) === 'auto') {
      localStorage.setItem(key, 'light')
    }
  })
}
