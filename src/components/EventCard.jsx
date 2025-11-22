import { Link } from 'react-router-dom'
import '../css/EventCard.css'

function EventCard({ evento }) {
  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones)
  }

  if (evento.agotado) {
    return (
      <div className="event-card event-card-agotado">
        <div className="event-image">
          <img src={evento.imagen} alt={evento.nombre} />
          <div className="agotado-badge">AGOTADO</div>
        </div>
        <div className="event-content">
          <h3 className="event-title">{evento.nombre}</h3>
          <div className="event-info">
            <div className="info-item">
              <span className="icon">📅</span>
              <span>{formatearFecha(evento.fecha)}</span>
            </div>
            <div className="info-item">
              <span className="icon">📍</span>
              <span>{evento.lugar}</span>
            </div>
          </div>
          <div className="proximas-fechas">🔔 Nuevas fechas próximamente</div>
        </div>
      </div>
    )
  }

  return (
    <Link to={`/evento/${evento.id}`} className="event-card">
      <div className="event-image">
        <img src={evento.imagen} alt={evento.nombre} />
        <div className="event-categoria">{evento.categoria}</div>
      </div>
      <div className="event-content">
        <h3 className="event-title">{evento.nombre}</h3>
        <div className="event-info">
          <div className="info-item">
            <span className="icon">📅</span>
            <span>{formatearFecha(evento.fecha)}</span>
          </div>
          <div className="info-item">
            <span className="icon">📍</span>
            <span>{evento.lugar}</span>
          </div>
        </div>
        <button className="btn-ver-mas">Ver Detalles</button>
      </div>
    </Link>
  )
}

export default EventCard
