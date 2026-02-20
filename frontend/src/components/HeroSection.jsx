import Button from './Button'
import './HeroSection.css'

/**
 * HeroSection — sección principal de bienvenida.
 */
export default function HeroSection({
    heading = 'Ven a disfrutar con tus amigos al Indiana Bill',
}) {
    return (
        <section className="hero">
            {/* Decorative blobs */}
            <div className="hero__blob hero__blob--1" aria-hidden="true" />
            <div className="hero__blob hero__blob--2" aria-hidden="true" />

            <div className="container hero__content">
                <h1 className="hero__heading fade-up">{heading}</h1>

                <p className="hero__sub fade-up">
                    En el <strong>Indiana Bill de Gijón</strong> encontrarás todo lo que necesitas para divertirte. <strong>Celebraciones de cumpleaños o eventos especiales para adultos en un local de más de 1300 metros cuadrados situado en el centro de la ciudad.</strong> Toboganes, parque de bolas, pista de fútbol, cafetería o comedor…
                </p>
                <p className="hero__sub fade-up">
                    Todo lo que buscas para tener un recuerdo inolvidable, está aquí.
                </p>


            </div>
        </section>
    )
}
