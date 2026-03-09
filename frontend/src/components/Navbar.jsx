import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/servicios', label: 'Servicios' },
    { to: '/cumpleanos', label: 'Cumpleaños' },
    { to: '/adultos', label: 'Adolescentes y adultos' },
    { to: '/localizacion', label: 'Localización' },
    { to: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { user, isAuthenticated, logout, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const close = () => setOpen(false)

    const handleLogout = () => {
        logout()
        navigate('/')
        close()
    }

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                {/* Logo */}
                <NavLink to="/" className="navbar__logo" onClick={close}>
                    <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Indiana Bill" className="navbar__logo-icon" />
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
                    
                    {/* Auth buttons */}
                    {!loading && (
                        <>
                            {isAuthenticated ? (
                                <>
                                    <NavLink
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            `navbar__link${isActive ? ' navbar__link--active' : ''}`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className={({ isActive }) =>
                                            `navbar__link${isActive ? ' navbar__link--active' : ''}`
                                        }
                                    >
                                        Perfil
                                    </NavLink>
                                    {user?.role === 'admin' && (
                                        <NavLink
                                            to="/admin"
                                            className={({ isActive }) =>
                                                `navbar__link${isActive ? ' navbar__link--active' : ''}`
                                            }
                                        >
                                            Admin
                                        </NavLink>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="navbar__cta navbar__logout"
                                    >
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            `navbar__link${isActive ? ' navbar__link--active' : ''}`
                                        }
                                    >
                                        Iniciar Sesión
                                    </NavLink>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            `navbar__link${isActive ? ' navbar__link--active' : ''}`
                                        }
                                    >
                                        Registrarse
                                    </NavLink>
                                </>
                            )}
                        </>
                    )}
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
                
                {/* Mobile auth buttons */}
                {!loading && (
                    <>
                        {isAuthenticated ? (
                            <>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                                    }
                                    onClick={close}
                                >
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) =>
                                        `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                                    }
                                    onClick={close}
                                >
                                    Perfil
                                </NavLink>
                                <button
                                    onClick={handleLogout}
                                    className="navbar__drawer-link navbar__drawer-logout"
                                >
                                    Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                                    }
                                    onClick={close}
                                >
                                    Iniciar Sesión
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={({ isActive }) =>
                                        `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
                                    }
                                    onClick={close}
                                >
                                    Registrarse
                                </NavLink>
                            </>
                        )}
                    </>
                )}
            </div>
        </header>
    )
}
