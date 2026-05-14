import { useEffect, useState } from 'react'
import ServiceCard from '../components/ServiceCard'
import Button from '../components/Button'
import './ServicesPage.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const DETAILS = {
    'cumpleanos-infantiles': {
        features: [
            'Acceso exclusivo al área infantil',
            'Monitor animador incluido',
            'Mesa decorada y menaje',
            'Invitaciones personalizadas',
            'Menú especial para niños',
        ],
    },
    'fiestas-adultos': {
        features: [
            'Espacio privado hasta 80 personas',
            'Zona de adultos habilitada',
            'Cafetería y bar disponibles',
            'Opciones de catering personalizadas',
            'Música ambiente o DJ (consultar)',
        ],
    },
    'ven-a-jugar': {
        features: [
            'Toboganes y tirolina',
            'Parque de bolas gigante',
            'Pista de fútbol techada',
            'Zona de escalada',
            'Cafetería para acompañantes',
        ],
    },
    'bonos-vip': {
        features: [
            'Acceso ilimitado durante 12 meses',
            'Descuentos en celebraciones',
            'Cola de prioridad en entrada',
            'Descuento en cafetería',
            'Regalo de cumpleaños incluido',
        ],
    },
}

export default function ServicesPage() {
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        fetch(`${API}/api/servicios`)
            .then((r) => r.json())
            .then(setServicios)
            .catch(console.error)
    }, [])

    return (
        <>
            {/* Page header */}
            <div className="services-hero">
                <div className="container">
                    <span className="services-hero__badge">🎯 Lo que ofrecemos</span>
                    <h1>Nuestros servicios</h1>
                    <p>Encuentra la opción perfecta para ti y los tuyos</p>
                </div>
            </div>

            {/* Cards overview */}
            <section className="section">
                <div className="container">
                    <div className="grid-4">
                        {servicios.map((s) => (
                            <ServiceCard key={s.id} {...s} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Detailed breakdown */}
            <section className="section services-detail">
                <div className="container">
                    <header className="section-header">
                        <h2>¿Qué incluye cada servicio?</h2>
                        <p>Transparencia total para que puedas elegir con tranquilidad</p>
                        <div className="divider" />
                    </header>

                    <div className="services-detail__grid">
                        {servicios.map((s) => {
                            const details = DETAILS[s.id] || { features: [] }
                            return (
                                <article
                                    key={s.id}
                                    className="detail-card"
                                    style={{ '--card-accent': s.color }}
                                >
                                    <div className="detail-card__header">
                                        <span className="detail-card__icon">{s.icono}</span>
                                        <div>
                                            <h3>{s.titulo}</h3>
                                            <span className="detail-card__price">{s.precio}</span>
                                        </div>
                                    </div>
                                    <p className="detail-card__desc">{s.descripcion}</p>
                                    <ul className="detail-card__features">
                                        {details.features.map((f) => (
                                            <li key={f}>
                                                <span aria-hidden="true">✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button href="/contacto" variant="primary" fullWidth>
                                        Reservar este servicio
                                    </Button>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}
