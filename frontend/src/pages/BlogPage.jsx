import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './BlogPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function ArticleCard({ article }) {
    return (
        <Link to={`/blog/${article.slug}`} className="blog-card">
            <div className="blog-card__cat">{article.categoria}</div>
            <h2 className="blog-card__title">{article.titulo}</h2>
            <p className="blog-card__desc">{article.descripcion}</p>
            <div className="blog-card__meta">
                <span>{new Date(article.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>{article.tiempo_lectura} min de lectura</span>
            </div>
            <span className="blog-card__cta">Leer artículo →</span>
        </Link>
    )
}

export function BlogPage() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${API}/api/blog/articles`)
            .then((r) => r.json())
            .then((d) => setArticles(d))
            .catch(() => {})
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <div className="blog-hero">
                <div className="container">
                    <span className="blog-hero__badge">Blog de Indiana Bill</span>
                    <h1>Consejos y recursos para familias</h1>
                    <p>Ideas para cumpleaños, desarrollo infantil y planes en familia en Gijón</p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    {loading && <p style={{ textAlign: 'center', color: 'var(--color-gray)' }}>Cargando artículos...</p>}
                    <div className="blog-grid">
                        {articles.map((a) => (
                            <ArticleCard key={a.slug} article={a} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export function BlogArticlePage() {
    const { slug } = useParams()
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch(`${API}/api/blog/articles/${slug}`)
            .then((r) => {
                if (!r.ok) throw new Error('not found')
                return r.json()
            })
            .then((d) => setArticle(d))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [slug])

    if (loading) return <div className="container" style={{ padding: '4rem 1rem' }}>Cargando...</div>
    if (error || !article) return (
        <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <h2>Artículo no encontrado</h2>
            <Link to="/blog" style={{ color: 'var(--color-green)' }}>← Volver al blog</Link>
        </div>
    )

    const bold = (s) => s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Join continuation lines (indented) into the previous line before processing
    const rawLines = article.contenido.split('\n')
    const lines = []
    for (const line of rawLines) {
        const isContinuation = /^\s{2,}/.test(line) && lines.length > 0
        if (isContinuation) {
            lines[lines.length - 1] += ' ' + line.trim()
        } else {
            lines.push(line)
        }
    }

    const tokens = lines.map((line) => {
        if (line.startsWith('## ')) return { type: 'h2', text: line.slice(3) }
        if (line.startsWith('### ')) return { type: 'h3', text: line.slice(4) }
        if (/^- /.test(line)) return { type: 'li', text: line.slice(2) }
        if (/^\d+\. /.test(line)) return { type: 'oli', text: line.replace(/^\d+\. /, '') }
        if (line.trim()) return { type: 'p', text: line }
        return { type: 'blank' }
    })

    let html = ''
    let inUl = false
    let inOl = false
    for (const tok of tokens) {
        if (tok.type !== 'li' && inUl) { html += '</ul>'; inUl = false }
        if (tok.type !== 'oli' && inOl) { html += '</ol>'; inOl = false }
        if (tok.type === 'h2') html += `<h2>${bold(tok.text)}</h2>`
        else if (tok.type === 'h3') html += `<h3>${bold(tok.text)}</h3>`
        else if (tok.type === 'li') { if (!inUl) { html += '<ul>'; inUl = true } html += `<li>${bold(tok.text)}</li>` }
        else if (tok.type === 'oli') { if (!inOl) { html += '<ol>'; inOl = true } html += `<li>${bold(tok.text)}</li>` }
        else if (tok.type === 'p') html += `<p>${bold(tok.text)}</p>`
    }
    if (inUl) html += '</ul>'
    if (inOl) html += '</ol>'

    const contentHtml = html

    return (
        <>
            <div className="blog-article-hero">
                <div className="container">
                    <Link to="/blog" className="blog-back">← Blog</Link>
                    <span className="blog-hero__badge">{article.categoria}</span>
                    <h1>{article.titulo}</h1>
                    <div className="blog-article-meta">
                        <span>{new Date(article.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span>{article.tiempo_lectura} min de lectura</span>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="blog-article-layout">
                        <article className="blog-article-body" dangerouslySetInnerHTML={{ __html: contentHtml }} />

                        <aside className="blog-article-sidebar">
                            <div className="blog-sidebar-card">
                                <h3>¿Te ha resultado útil?</h3>
                                <p>Reserva ahora y celebra una fiesta inolvidable en Indiana Bill Gijón.</p>
                                <a href="/cumpleanos" className="blog-sidebar-btn">Ver cumpleaños →</a>
                                <a href="https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20tengo%20una%20consulta" target="_blank" rel="noopener noreferrer" className="blog-sidebar-btn blog-sidebar-btn--wa">Preguntar por WhatsApp</a>
                            </div>

                            <div className="blog-sidebar-card blog-sidebar-card--light">
                                <h3>Artículos relacionados</h3>
                                <Link to="/blog" className="blog-sidebar-link">← Ver todos los artículos</Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    )
}
