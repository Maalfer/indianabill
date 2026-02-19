import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'

export default function MainLayout() {
    return (
        <>
            <Navbar />
            <main style={{ paddingTop: '72px', flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </>
    )
}
