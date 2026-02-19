import Button from './Button'
import './HeroSection.css'

/**
 * HeroSection — sección principal de bienvenida.
 */
export default function HeroSection({
    heading = 'Ven a disfrutar con tus amigos al Indiana Bill',
    subheading = 'Más de 1300 m² de diversión en el centro de Gijón. Cumpleaños, fiestas y mucho más.',
    ctaText = 'Ver servicios',
    ctaHref = '/servicios',
    secondText = 'Contáctanos',
    secondHref = '/contacto',
}) {
    return (
        <section className="hero">
            {/* Decorative blobs */}
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />

            <div className="container hero__content">
                <span className="hero__badge">🎉 Diversión para todas las edades</span>
                <h1 className="hero__heading fade-up">{heading}</h1>
                <p className="hero__sub fade-up">{subheading}</p>

                <div className="hero__actions fade-up">
                    <Button href={ctaHref} variant="primary" size="lg">
                        {ctaText}
                    </Button>
                    <Button href={secondHref} variant="outline" size="lg">
                        {secondText}
                    </Button>
                </div>

                {/* Stats bar */}
                <div className="hero__stats">
                    {[
                        { label: 'Metros cuadrados', value: '+1300 m²' },
                        { label: 'Años de experiencia', value: '+10 años' },
                        { label: 'Familias felices', value: '+5000' },
                    ].map(({ label, value }) => (
                        <div key={label} className="hero__stat">
                            <strong>{value}</strong>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
