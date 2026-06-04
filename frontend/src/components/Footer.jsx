import { Link } from 'react-router-dom'
import Newsletter from './Newsletter'
import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Indiana Bill" className="footer__logo-icon" />
                    <p className="footer__brand-name">Indiana<strong>Bill</strong> Gijón</p>
                    <p className="footer__tagline">
                        Más de 1.300 m² de diversión cubierta en el centro de Gijón.
                    </p>
                    <div className="footer__socials">
                        <a href="https://www.facebook.com/IndianaBilldeGijon/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-link">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/indianabillgijon/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
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
                    <h4 className="footer__nav-title">Servicios</h4>
                    <ul>
                        <li><Link to="/cumpleanos">Cumpleaños infantiles</Link></li>
                        <li><Link to="/juego-libre">Juego libre</Link></li>
                        <li><Link to="/fiestas-privadas">Fiestas privadas</Link></li>
                        <li><Link to="/instalaciones">Instalaciones</Link></li>
                    </ul>
                </div>

                {/* Promos */}
                <div className="footer__nav">
                    <h4 className="footer__nav-title">Promociones</h4>
                    <ul>
                        <li><Link to="/martes-en-familia">Martes en Familia</Link></li>
                        <li><Link to="/dado-loco">Dado Loco</Link></li>
                        <li><Link to="/bono-indy">Bono Indy</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/contacto">Contacto</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer__contact">
                    <h4 className="footer__nav-title">Contacto</h4>
                    <ul>
                        <li>C/ Espronceda, 17 — Gijón</li>
                        <li><a href="tel:985374167">985 374 167</a></li>
                        <li><a href="tel:684657760">684 657 760</a></li>
                        <li>
                            <a href="https://wa.me/34684657760" target="_blank" rel="noopener noreferrer">
                                WhatsApp
                            </a>
                        </li>
                    </ul>
                    <div className="footer__hours-inline">
                        <strong>Horario</strong>
                        <p>Mar y Jue: 17:00–21:00</p>
                        <p>Vie, Sáb y Vísperas: 17:00–21:30</p>
                        <p>Dom y Festivos: 17:00–21:00</p>
                        <p>Lun: cerrado</p>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="footer__newsletter">
                    <Newsletter />
                </div>
            </div>

            <div className="footer__bottom">
                <p>© {year} Indiana Bill Gijón. Todos los derechos reservados.</p>
                <p className="footer__credit">
                    Hecho con <span className="footer__credit-heart" aria-label="amor">❤️</span> por{' '}
                    <a
                        href="https://www.linkedin.com/in/maalfer1/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer__credit-name"
                    >
                        Mario Álvarez Fernández
                    </a>
                </p>
            </div>
        </footer>
    )
}
