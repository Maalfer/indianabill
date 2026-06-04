import './PhotoSlot.css'

/**
 * PhotoSlot — marca dónde va una foto real.
 * Para insertar la foto real: reemplaza <PhotoSlot> por <img src="..." alt="..." className="..." />.
 * @param {string} label   — descripción de la foto para accesibilidad y referencia
 * @param {string} ratio   — aspect-ratio CSS (p.ej. "16/9", "4/3", "4/5", "1/1")
 * @param {string} size    — 'sm' | 'md' | 'lg'
 * @param {string} className — clases extra
 */
export default function PhotoSlot({ label = 'Foto próximamente', ratio = '4/3', size = 'md', className = '' }) {
    return (
        <div
            className={`photo-slot photo-slot--${size} ${className}`.trim()}
            style={{ aspectRatio: ratio }}
            role="img"
            aria-label={label}
        >
            <div className="photo-slot__inner">
                <svg className="photo-slot__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                </svg>
                <span className="photo-slot__label">{label}</span>
            </div>
        </div>
    )
}
