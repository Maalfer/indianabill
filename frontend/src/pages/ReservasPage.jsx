import { useState } from 'react'
import './ReservasPage.css'

export default function ReservasPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  
  const daysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }
  
  const firstDayOfMonth = (date) => {
    const day = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
    return (day + 6) % 7 // Monday = 0
  }
  
  const generateCalendarDays = () => {
    const days = []
    const daysCount = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysCount; i++) {
      days.push(i)
    }
    
    return days
  }
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }
  
  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      setSelectedDate(newDate)
    }
  }
  
  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear()
  }
  
  const isSelected = (day) => {
    return day === selectedDate.getDate() && 
           currentMonth.getMonth() === selectedDate.getMonth() && 
           currentMonth.getFullYear() === selectedDate.getFullYear()
  }
  
  const handleConfirmReserva = () => {
    const formattedDate = selectedDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    
    const message = encodeURIComponent(
      `¡Hola! \n\nQuiero hacer una reserva para el día ${formattedDate}.\n\n¿Podrían confirmarme la disponibilidad?\n\nGracias! `
    )
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=34684657760&text=${message}`
    window.open(whatsappUrl, '_blank')
  }
  
  const calendarDays = generateCalendarDays()
  
  return (
    <div className="reservas-page">
      <div className="reservas-container">
        <div className="reservas-header">
          <h1>Reservas</h1>
          <p>Selecciona una fecha para hacer tu reserva</p>
        </div>
        
        <div className="calendar-container">
          <div className="calendar-header">
            <button className="calendar-nav-button" onClick={handlePrevMonth}>
              ◀
            </button>
            <h2 className="calendar-title">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button className="calendar-nav-button" onClick={handleNextMonth}>
              ▶
            </button>
          </div>
          
          <div className="calendar-grid">
            {/* Day headers */}
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`calendar-day ${!day ? 'calendar-day--empty' : ''} ${
                  isToday(day) ? 'calendar-day--today' : ''
                } ${isSelected(day) ? 'calendar-day--selected' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
        
        <div className="reservas-info">
          <h3>Fecha seleccionada</h3>
          <p className="selected-date">
            {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <button className="reservas-button" onClick={handleConfirmReserva}>
            Confirmar Reserva
          </button>
        </div>
      </div>
    </div>
  )
}
