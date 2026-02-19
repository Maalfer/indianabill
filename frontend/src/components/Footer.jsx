import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <img src="/logo.png" alt="Indiana Bill" className="footer__logo-icon" />
                    <p className="footer__brand-name">Indiana<strong>Bill</strong> Gijón</p>
                    <p className="footer__tagline">
                        Más de 1300 m² de diversión en el centro de Gijón.
                    </p>
                    <div className="footer__socials">
                        <a
                            href="https://www.facebook.com/IndianaBilldeGijon/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="footer__social-link"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a
                            href="https://www.instagram.com/indianabillgijon/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="footer__social-link"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Nav */}
                <div className="footer__nav">
                    <h4 className="footer__nav-title">Navegación</h4>
                    <ul>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/servicios">Servicios</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer__contact">
                    <h4 className="footer__nav-title">Contacto</h4>
                    <ul>
                        <li>📍 Calle Mayor, 1 — Gijón</li>
                        <li>📞 +34 984 000 000</li>
                        <li>✉️ info@indianabillgijon.es</li>
                    </ul>
                </div>

                {/* Hours */}
                <div className="footer__hours">
                    <h4 className="footer__nav-title">Horario</h4>
                    <ul>
                        <li>Lun – Vie: 16:00 – 21:00</li>
                        <li>Viernes: 16:00 – 22:00</li>
                        <li>Sábado: 11:00 – 22:00</li>
                        <li>Domingo: 11:00 – 21:00</li>
                    </ul>
                </div>
            </div>

            <div className="footer__bottom">
                <p>© {year} Indiana Bill Gijón. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
