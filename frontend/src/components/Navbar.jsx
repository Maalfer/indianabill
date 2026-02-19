import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const close = () => setOpen(false)

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                {/* Logo */}
                <NavLink to="/" className="navbar__logo" onClick={close}>
                    <img src="/logo.png" alt="Indiana Bill" className="navbar__logo-icon" />
                    <span className="navbar__logo-text">
                        Indiana<strong>Bill</strong>
                    </span>
                </NavLink>

                {/* Desktop nav */}
                <nav className="navbar__links">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) =>
                                `navbar__link${isActive ? ' navbar__link--active' : ''}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <a
                        href="https://wa.me/34984000000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar__cta"
                    >
                        Reservar ahora
                    </a>
                </nav>

                {/* Hamburger */}
                <button
                    className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Abrir menú"
                >
                    <span />
                    <span />
                    <span />
                </button>
            </div>

            {/* Mobile drawer */}
            <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`}>
                {NAV_LINKS.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) =>
                            `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                        }
                        onClick={close}
                    >
                        {label}
                    </NavLink>
                ))}
                <a
                    href="https://wa.me/34984000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navbar__cta"
                    onClick={close}
                >
                    Reservar ahora
                </a>
            </div>
        </header>
    )
}
