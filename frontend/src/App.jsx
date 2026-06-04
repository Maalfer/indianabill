import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import MainLayout from './components/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import CumpleanosPage from './pages/CumpleanosPage'
import JuegoLibrePage from './pages/JuegoLibrePage'
import FiestasPrivadasPage from './pages/FiestasPrivadasPage'
import MartesEnFamiliaPage from './pages/MartesEnFamiliaPage'
import BonoIndyPage from './pages/BonoIndyPage'
import DadoLocoPage from './pages/DadoLocoPage'
import InstalacionesPage from './pages/InstalacionesPage'
import LocalizacionPage from './pages/LocalizacionPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import ProfilePage from './pages/ProfilePage'
import ConfigPage from './pages/ConfigPage'
import ReservasPage from './pages/ReservasPage'
import AdminPage from './pages/AdminPage'
import { BlogPage, BlogArticlePage } from './pages/BlogPage'
import PanelPage from './pages/PanelPage'
import VerificarPage from './pages/VerificarPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
    return (
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AuthProvider>
                <ThemeProvider>
                    <Routes>
                        <Route element={<MainLayout />}>
                            {/* Páginas públicas */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/cumpleanos" element={<CumpleanosPage />} />
                            <Route path="/juego-libre" element={<JuegoLibrePage />} />
                            <Route path="/fiestas-privadas" element={<FiestasPrivadasPage />} />
                            <Route path="/martes-en-familia" element={<MartesEnFamiliaPage />} />
                            <Route path="/bono-indy" element={<BonoIndyPage />} />
                            <Route path="/dado-loco" element={<DadoLocoPage />} />
                            <Route path="/instalaciones" element={<InstalacionesPage />} />
                            <Route path="/localizacion" element={<LocalizacionPage />} />
                            <Route path="/contacto" element={<ContactPage />} />
                            <Route path="/reservas" element={<ReservasPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogArticlePage />} />
                            <Route path="/panel" element={<PanelPage />} />

                            {/* Auth */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/verificar" element={<VerificarPage />} />

                            {/* Protegidas (cualquier usuario autenticado) */}
                            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="/config" element={<ProtectedRoute><ConfigPage /></ProtectedRoute>} />

                            {/* Solo admin */}
                            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />

                            <Route path="*" element={<NotFoundPage />} />
                        </Route>
                    </Routes>
                </ThemeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
