import { useState } from 'react'
import './FAQAccordion.css'

/**
 * FAQAccordion — lista de preguntas frecuentes desplegables.
 */
export default function FAQAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <ul className="faq">
            {items.map((item, i) => (
                <li key={i} className={`faq__item${openIndex === i ? ' faq__item--open' : ''}`}>
                    <button
                        className="faq__question"
                        onClick={() => toggle(i)}
                        aria-expanded={openIndex === i}
                    >
                        <span>{item.pregunta}</span>
                        <span className="faq__icon" aria-hidden="true">
                            {openIndex === i ? '−' : '+'}
                        </span>
                    </button>
                    <div
                        className="faq__answer"
                        style={{ maxHeight: openIndex === i ? '400px' : '0' }}
                    >
                        <p>{item.respuesta}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
