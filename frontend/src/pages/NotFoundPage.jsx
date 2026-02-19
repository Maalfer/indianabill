import { Link } from 'react-router-dom'
import Button from '../components/Button'
import './NotFoundPage.css'

export default function NotFoundPage() {
    return (
        <div className="not-found">
            <div className="not-found__emoji" aria-hidden="true">🎪</div>
            <h1 className="not-found__code">404</h1>
            <h2>¡Ups! Esta página no existe</h2>
            <p>Parece que te has perdido en el parque de bolas.<br />Volvamos al inicio.</p>
            <Button href="/" variant="primary" size="lg">
                Volver al inicio
            </Button>
        </div>
    )
}
