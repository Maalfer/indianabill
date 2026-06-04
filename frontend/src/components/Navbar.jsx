import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Navbar.css'

const NAV_LINKS = [
    { to: '/', label: 'Inicio' },
    { to: '/cumpleanos', label: 'Cumpleaños infantiles' },
    { to: '/fiestas-privadas', label: 'Fiestas privadas' },
    { to: '/juego-libre', label: 'Juego libre' },
    { to: '/instalaciones', label: 'Instalaciones' },
    { to: '/contacto', label: 'Contacto' },
]

const PROMOS = [
    { to: '/martes-en-familia', label: 'Martes en Familia' },
    { to: '/dado-loco', label: 'Dado Loco' },
    { to: '/bono-indy', label: 'Bono Indy' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [promosOpen, setPromosOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const { user, isAuthenticated, logout, loading } = useAuth()
    const navigate = useNavigate()
    const promosRef = useRef(null)
    const profileRef = useRef(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const onClickOutside = (e) => {
            if (promosRef.current && !promosRef.current.contains(e.target)) setPromosOpen(false)
            if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    const close = () => { setOpen(false); setPromosOpen(false) }

    const handleLogout = () => {
        logout()
        navigate('/')
        close()
        setProfileOpen(false)
    }

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <NavLink to="/" className="navbar__logo" onClick={close}>
                    <img src={import.meta.env.BASE_URL + 'logo.png'} alt="Indiana Bill" className="navbar__logo-icon" />
                    <span className="navbar__logo-text">Indiana<strong>Bill</strong></span>
                </NavLink>

                {/* Desktop nav */}
                <nav className="navbar__links">
                    {NAV_LINKS.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/'}
                            className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                        >
                            {label}
                        </NavLink>
                    ))}

                    {/* Dropdown Promociones */}
                    <div className="navbar__dropdown" ref={promosRef}>
                        <button
                            className={`navbar__link navbar__link--dropdown${promosOpen ? ' navbar__link--active' : ''}`}
                            onClick={() => setPromosOpen(!promosOpen)}
                            aria-expanded={promosOpen}
                        >
                            Promociones <span className={`navbar__arrow${promosOpen ? ' navbar__arrow--open' : ''}`}>▾</span>
                        </button>
                        {promosOpen && (
                            <div className="navbar__dropdown-menu">
                                {PROMOS.map(({ to, label }) => (
                                    <NavLink
                                        key={to}
                                        to={to}
                                        className="navbar__dropdown-item"
                                        onClick={() => { setPromosOpen(false) }}
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Auth: Login/Registro (no autenticado) */}
                    {!loading && !isAuthenticated && (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => `navbar__link${isActive ? ' navbar__link--active' : ''}`}
                            >
                                Iniciar sesión
                            </NavLink>
                            <NavLink to="/register" className="navbar__register">
                                Registrarse
                            </NavLink>
                        </>
                    )}

                    {/* Perfil (solo autenticados) */}
                    {!loading && isAuthenticated && (
                        <div className="navbar__dropdown" ref={profileRef}>
                            <button
                                className={`navbar__link navbar__link--dropdown${profileOpen ? ' navbar__link--active' : ''}`}
                                onClick={() => setProfileOpen(!profileOpen)}
                            >
                                {user?.username || 'Mi cuenta'} <span className={`navbar__arrow${profileOpen ? ' navbar__arrow--open' : ''}`}>▾</span>
                            </button>
                            {profileOpen && (
                                <div className="navbar__dropdown-menu">
                                    <NavLink to="/panel" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>Mis reservas</NavLink>
                                    <NavLink to="/dashboard" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>Dashboard</NavLink>
                                    <NavLink to="/profile" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>Mi perfil</NavLink>
                                    {user?.role === 'admin' && (
                                        <NavLink to="/admin" className="navbar__dropdown-item" onClick={() => setProfileOpen(false)}>Admin</NavLink>
                                    )}
                                    <button onClick={handleLogout} className="navbar__dropdown-item navbar__dropdown-item--logout">
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </nav>

                {/* Hamburger */}
                <button
                    className={`navbar__burger${open ? ' navbar__burger--open' : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Abrir menú"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile drawer */}
            <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`}>
                {NAV_LINKS.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
                        onClick={close}
                    >
                        {label}
                    </NavLink>
                ))}

                <div className="navbar__drawer-section">Promociones</div>
                {PROMOS.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => `navbar__drawer-link navbar__drawer-link--sub${isActive ? ' navbar__drawer-link--active' : ''}`}
                        onClick={close}
                    >
                        {label}
                    </NavLink>
                ))}

                {!loading && !isAuthenticated && (
                    <>
                        <div className="navbar__drawer-section">Acceder</div>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`}
                            onClick={close}
                        >
                            Iniciar sesión
                        </NavLink>
                        <NavLink to="/register" className="navbar__drawer-link navbar__drawer-register" onClick={close}>
                            Registrarse
                        </NavLink>
                    </>
                )}

                {!loading && isAuthenticated && (
                    <>
                        <div className="navbar__drawer-section">Mi cuenta</div>
                        <NavLink to="/panel" className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`} onClick={close}>Mis reservas</NavLink>
                        <NavLink to="/dashboard" className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`} onClick={close}>Dashboard</NavLink>
                        <NavLink to="/profile" className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`} onClick={close}>Mi perfil</NavLink>
                        {user?.role === 'admin' && (
                            <NavLink to="/admin" className={({ isActive }) => `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`} onClick={close}>Admin</NavLink>
                        )}
                        <button onClick={handleLogout} className="navbar__drawer-link navbar__drawer-logout">Cerrar sesión</button>
                    </>
                )}
            </div>
        </header>
    )
}
