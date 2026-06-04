import { useState, useRef, useEffect } from 'react'
import './ChatBot.css'

const WELCOME = [
    {
        id: 1,
        from: 'bot',
        text: '¡Hola! Soy IndiBot, el asistente virtual de Indiana Bill Gijón. 🤖\n\nPronto podré ayudarte con reservas, precios y toda la info que necesites.',
    },
    {
        id: 2,
        from: 'bot',
        text: 'Por ahora estoy en construcción. Si necesitas ayuda urgente, ¡escríbenos por WhatsApp o llámanos!',
    },
]

const WA = 'https://api.whatsapp.com/send?phone=34684657760&text=Hola%2C%20quiero%20info%20sobre%20Indiana%20Bill%20Gij%C3%B3n'

export default function ChatBot() {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState(WELCOME)
    const [showTooltip, setShowTooltip] = useState(false)
    const endRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        if (open) {
            endRef.current?.scrollIntoView({ behavior: 'smooth' })
            inputRef.current?.focus()
        }
    }, [open, messages])

    useEffect(() => {
        const timer = setTimeout(() => setShowTooltip(true), 3000)
        const hide = setTimeout(() => setShowTooltip(false), 8000)
        return () => { clearTimeout(timer); clearTimeout(hide) }
    }, [])

    const handleSend = (e) => {
        e.preventDefault()
        const text = input.trim()
        if (!text) return
        const userMsg = { id: Date.now(), from: 'user', text }
        const botReply = {
            id: Date.now() + 1,
            from: 'bot',
            text: 'Gracias por tu mensaje. 😊 Estoy aprendiendo y pronto podré responderte con IA. Por ahora, contacta con nosotros por WhatsApp.',
        }
        setMessages((prev) => [...prev, userMsg, botReply])
        setInput('')
    }

    return (
        <>
            {/* Tooltip */}
            {showTooltip && !open && (
                <div className="chatbot__tooltip">
                    ¿Tienes dudas? ¡Pregúntame!
                    <button className="chatbot__tooltip-close" onClick={() => setShowTooltip(false)}>×</button>
                </div>
            )}

            {/* Chat panel */}
            <div className={`chatbot__panel${open ? ' chatbot__panel--open' : ''}`} role="dialog" aria-label="Chat de asistencia">
                <div className="chatbot__header">
                    <div className="chatbot__header-avatar">
                        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                            <rect x="6" y="10" width="20" height="14" rx="4" fill="white" fillOpacity=".2"/>
                            <rect x="9" y="13" width="4" height="4" rx="2" fill="white"/>
                            <rect x="19" y="13" width="4" height="4" rx="2" fill="white"/>
                            <rect x="13" y="19" width="6" height="2" rx="1" fill="white"/>
                            <rect x="14" y="6" width="4" height="4" rx="1" fill="white" fillOpacity=".8"/>
                            <rect x="15.5" y="4" width="1" height="2" rx=".5" fill="white"/>
                            <rect x="4" y="15" width="2" height="5" rx="1" fill="white" fillOpacity=".5"/>
                            <rect x="26" y="15" width="2" height="5" rx="1" fill="white" fillOpacity=".5"/>
                        </svg>
                    </div>
                    <div className="chatbot__header-info">
                        <strong>IndiBot</strong>
                        <span>Asistente virtual · Próximamente con IA</span>
                    </div>
                    <button className="chatbot__close-btn" onClick={() => setOpen(false)} aria-label="Cerrar chat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <div className="chatbot__messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`chatbot__msg chatbot__msg--${msg.from}`}>
                            {msg.from === 'bot' && (
                                <div className="chatbot__msg-avatar">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                                        <rect x="4" y="7" width="16" height="11" rx="3" fill="currentColor" fillOpacity=".2"/>
                                        <rect x="7" y="10" width="3" height="3" rx="1.5" fill="currentColor"/>
                                        <rect x="14" y="10" width="3" height="3" rx="1.5" fill="currentColor"/>
                                        <rect x="10" y="15" width="4" height="1.5" rx=".75" fill="currentColor"/>
                                        <rect x="10.5" y="4" width="3" height="3" rx=".5" fill="currentColor" fillOpacity=".8"/>
                                        <rect x="11.5" y="3" width="1" height="1.5" rx=".5" fill="currentColor"/>
                                    </svg>
                                </div>
                            )}
                            <div className="chatbot__msg-bubble">
                                {msg.text.split('\n').map((line, i) => (
                                    <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div ref={endRef} />
                </div>

                <div className="chatbot__footer">
                    <a href={WA} target="_blank" rel="noopener noreferrer" className="chatbot__wa-btn">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Contactar por WhatsApp
                    </a>
                    <form className="chatbot__input-row" onSubmit={handleSend}>
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                            className="chatbot__input"
                            maxLength={300}
                        />
                        <button type="submit" className="chatbot__send-btn" aria-label="Enviar" disabled={!input.trim()}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </form>
                    <p className="chatbot__powered">Próximamente impulsado por <strong>Claude AI</strong></p>
                </div>
            </div>

            {/* Floating button */}
            <button
                className={`chatbot__fab${open ? ' chatbot__fab--open' : ''}`}
                onClick={() => { setOpen(!open); setShowTooltip(false) }}
                aria-label={open ? 'Cerrar chat' : 'Abrir chat de ayuda'}
            >
                <span className="chatbot__fab-icon chatbot__fab-icon--robot">
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                        <rect x="7" y="13" width="26" height="18" rx="6" fill="white" fillOpacity=".95"/>
                        <circle cx="14" cy="22" r="3.5" fill="#00A851"/>
                        <circle cx="26" cy="22" r="3.5" fill="#00A851"/>
                        <rect x="16" y="27" width="8" height="2.5" rx="1.25" fill="#00A851"/>
                        <rect x="17.5" y="7" width="5" height="6" rx="2" fill="white" fillOpacity=".9"/>
                        <circle cx="20" cy="7" r="1.5" fill="white"/>
                        <rect x="3" y="19" width="4" height="7" rx="2" fill="white" fillOpacity=".7"/>
                        <rect x="33" y="19" width="4" height="7" rx="2" fill="white" fillOpacity=".7"/>
                        <circle cx="14" cy="22" r="1.5" fill="white"/>
                        <circle cx="26" cy="22" r="1.5" fill="white"/>
                    </svg>
                </span>
                <span className="chatbot__fab-icon chatbot__fab-icon--close">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" width="22" height="22">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </span>
            </button>
        </>
    )
}
