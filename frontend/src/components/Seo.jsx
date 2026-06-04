import { useEffect } from 'react'

const SITE = 'https://indianabill.duckdns.org'

function setMeta(attr, key, content) {
    if (!content) return
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function setCanonical(href) {
    let el = document.head.querySelector('link[rel="canonical"]')
    if (!el) {
        el = document.createElement('link')
        el.setAttribute('rel', 'canonical')
        document.head.appendChild(el)
    }
    el.setAttribute('href', href)
}

/**
 * Seo — actualiza título, descripción, canonical y Open Graph por página.
 * SPA client-side: reutiliza las etiquetas existentes de index.html.
 */
export default function Seo({ title, description, path = '' }) {
    useEffect(() => {
        const url = SITE + path
        if (title) {
            document.title = title
            setMeta('property', 'og:title', title)
            setMeta('name', 'twitter:title', title)
        }
        if (description) {
            setMeta('name', 'description', description)
            setMeta('property', 'og:description', description)
            setMeta('name', 'twitter:description', description)
        }
        setMeta('property', 'og:url', url)
        setCanonical(url)
    }, [title, description, path])

    return null
}
