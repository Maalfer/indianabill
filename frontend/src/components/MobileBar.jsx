import { Link } from 'react-router-dom'
import './MobileBar.css'

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20consultar%20disponibilidad%20en%20Indiana%20Bill%20Gij%C3%B3n'

export default function MobileBar() {
    return (
        <div className="mobile-bar">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="mobile-bar__btn mobile-bar__btn--wa">
                <span className="mobile-bar__icon">💬</span>
                <span className="mobile-bar__label">WhatsApp</span>
            </a>
            <a href="tel:684657760" className="mobile-bar__btn mobile-bar__btn--call">
                <span className="mobile-bar__icon">📞</span>
                <span className="mobile-bar__label">Llamar</span>
            </a>
            <Link to="/cumpleanos" className="mobile-bar__btn mobile-bar__btn--book">
                <span className="mobile-bar__icon">📅</span>
                <span className="mobile-bar__label">Consultar fecha</span>
            </Link>
        </div>
    )
}
