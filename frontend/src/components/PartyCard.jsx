import Button from './Button'
import './PartyCard.css'

export default function PartyCard({
    title,
    description,
    buttonText = 'Clic para saber más',
    buttonHref = '/servicios',
    overlayColor = 'blue',
    backgroundImage,
    className = '',
}) {
    return (
        <div className={`party-card party-card--${overlayColor} ${className}`.trim()}>
            <div className="party-card__background">
                {backgroundImage && (
                    <img src={backgroundImage} alt={title} className="party-card__image" />
                )}
            </div>
            <div className="party-card__overlay" />
            <div className="party-card__content">
                <h3 className="party-card__title">{title}</h3>
                {description && <p className="party-card__description">{description}</p>}
                <Button href={buttonHref} variant="light" size="md">
                    {buttonText}
                </Button>
            </div>
        </div>
    )
}
