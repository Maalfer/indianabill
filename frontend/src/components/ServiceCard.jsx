import { Link } from 'react-router-dom'
import './ServiceCard.css'

/**
 * ServiceCard — tarjeta de servicio con color de acento, icono, título y descripción.
 */
export default function ServiceCard({ id, titulo, descripcion, precio, icono, color }) {
    return (
        <article className="service-card" style={{ '--card-accent': color }}>
            <div className="service-card__icon" aria-hidden="true">
                {icono}
            </div>
            <h3 className="service-card__title">{titulo}</h3>
            <p className="service-card__desc">{descripcion}</p>
            <div className="service-card__footer">
                <span className="service-card__price">{precio}</span>
                <Link to="/servicios" className="service-card__link">
                    Saber más →
                </Link>
            </div>
        </article>
    )
}
