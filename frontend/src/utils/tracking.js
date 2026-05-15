/**
 * tracking.js — Utilidad de analítica para Indiana Bill.
 * Dispara eventos a GA4 (gtag) y Meta Pixel (fbq) si están cargados.
 * Si no hay IDs configurados simplemente no hace nada.
 */

export function trackEvent(eventName, params = {}) {
    const enriched = { ...params, page: window.location.pathname }

    // Google Analytics 4
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, enriched)
    }

    // Meta Pixel
    if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', eventName, enriched)
    }
}

export const trackWhatsApp = (origen = 'desconocido') =>
    trackEvent('whatsapp_click', { origen })

export const trackCall = (origen = 'desconocido') =>
    trackEvent('call_click', { origen })

export const trackFormSubmit = (servicio = 'cumpleanos') =>
    trackEvent('lead_form_submit', { servicio })

export const trackReservaInit = () =>
    trackEvent('reserva_iniciada')

/**
 * setupGlobalClickTracking — escucha todos los clics del documento
 * y detecta automáticamente links de WhatsApp y teléfono.
 * Llamar una sola vez al montar la app.
 */
export function setupGlobalClickTracking() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href]')
        if (!link) return

        const href = link.getAttribute('href') || ''

        if (href.includes('whatsapp.com') || href.includes('wa.me')) {
            trackWhatsApp(document.title)
            // Meta Pixel estándar
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Contact')
            }
        } else if (href.startsWith('tel:')) {
            trackCall(document.title)
            if (typeof window.fbq === 'function') {
                window.fbq('track', 'Contact')
            }
        }
    })
}
