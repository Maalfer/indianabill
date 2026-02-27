import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import CumpleanosPage from './pages/CumpleanosPage'
import AdultosPage from './pages/AdultosPage'
import LocalizacionPage from './pages/LocalizacionPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/cumpleanos" element={<CumpleanosPage />} />
          <Route path="/adultos" element={<AdultosPage />} />
          <Route path="/localizacion" element={<LocalizacionPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
