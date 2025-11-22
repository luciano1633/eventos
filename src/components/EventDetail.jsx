import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import axios from 'axios'
import ReservaModal from './ReservaModal'
import '../css/EventDetail.css'

const GET_EVENT_DETAILS = gql`
  query GetEventDetails($id: Int!) {
    eventoDetalle(id: $id) {
      id
      organizador
      asistentesConfirmados
      descripcion
      capacidadMaxima
      precio
      requisitos
    }
  }
`

function EventDetail() {
  const { id } = useParams()
  const [eventoBasico, setEventoBasico] = useState(null)
  const [loadingBasico, setLoadingBasico] = useState(true)
  const [mostrarModal, setMostrarModal] = useState(false)
  
  const { loading: loadingGraphQL, error: errorGraphQL, data } = useQuery(GET_EVENT_DETAILS, {
    variables: { id: parseInt(id) }
  })

  useEffect(() => {
    const fetchEventoBasico = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/eventos/${id}`)
        setEventoBasico(response.data)
        setLoadingBasico(false)
      } catch (err) {
        console.error('Error al cargar evento básico:', err)
        setLoadingBasico(false)
      }
    }

    fetchEventoBasico()
  }, [id])

  const formatearFecha = (fecha) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(fecha + 'T00:00:00').toLocaleDateString('es-ES', opciones)
  }

  if (loadingBasico || loadingGraphQL) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando detalles del evento...</p>
        </div>
      </div>
    )
  }

  if (errorGraphQL) {
    return (
      <div className="container">
        <div className="error">
          <p>⚠️ Error al cargar detalles adicionales del evento.</p>
          <p className="error-hint">Asegúrate de que el servidor GraphQL esté ejecutándose en el puerto 4000.</p>
          <Link to="/" className="btn-volver">← Volver a Eventos</Link>
        </div>
      </div>
    )
  }

  if (!eventoBasico) {
    return (
      <div className="container">
        <div className="error">
          <p>Evento no encontrado</p>
          <Link to="/" className="btn-volver">← Volver a Eventos</Link>
        </div>
      </div>
    )
  }

  const detalles = data?.eventoDetalle

  // Si el evento está agotado, mostrar página de agotado
  if (eventoBasico.agotado) {
    return (
      <div className="container">
        <Link to="/" className="btn-back">← Volver a Eventos</Link>
        
        <div className="event-detail-card evento-agotado-detalle">
          <div className="detail-image">
            <img src={eventoBasico.imagen} alt={eventoBasico.nombre} style={{ filter: 'grayscale(50%)' }} />
            <div className="agotado-overlay">
              <div className="agotado-badge-grande">AGOTADO</div>
            </div>
          </div>

          <div className="detail-content">
            <h2 className="detail-title">{eventoBasico.nombre}</h2>

            <div className="detail-info-grid">
              <div className="detail-info-item">
                <span className="icon">📅</span>
                <div>
                  <strong>Fecha</strong>
                  <p>{formatearFecha(eventoBasico.fecha)}</p>
                </div>
              </div>

              <div className="detail-info-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Ubicación</strong>
                  <p>{eventoBasico.lugar}</p>
                </div>
              </div>

              <div className="detail-info-item">
                <span className="icon">🎫</span>
                <div>
                  <strong>Categoría</strong>
                  <p>{eventoBasico.categoria}</p>
                </div>
              </div>
            </div>

            <div className="alerta-agotado">
              <div className="alerta-icono">🔔</div>
              <div className="alerta-contenido">
                <h3>Entradas Agotadas</h3>
                <p>Lo sentimos, todas las entradas para este evento han sido vendidas.</p>
                <p className="alerta-proximamente">Nuevas fechas próximamente. Mantente atento a nuestras redes sociales para no perderte la próxima oportunidad.</p>
              </div>
            </div>

            <Link to="/" className="btn-volver-eventos">
              Ver Otros Eventos Disponibles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Link to="/" className="btn-back">← Volver a Eventos</Link>
      
      <div className="event-detail-card">
        <div className="detail-image">
          <img src={eventoBasico.imagen} alt={eventoBasico.nombre} />
          <div className="detail-categoria">{eventoBasico.categoria}</div>
        </div>

        <div className="detail-content">
          <h2 className="detail-title">{eventoBasico.nombre}</h2>

          <div className="detail-info-grid">
            <div className="detail-info-item">
              <span className="detail-icon">📅</span>
              <div>
                <strong>Fecha</strong>
                <p>{formatearFecha(eventoBasico.fecha)}</p>
              </div>
            </div>

            <div className="detail-info-item">
              <span className="detail-icon">📍</span>
              <div>
                <strong>Lugar</strong>
                <p>{eventoBasico.lugar}</p>
              </div>
            </div>

            {detalles && (
              <>
                <div className="detail-info-item">
                  <span className="detail-icon">👥</span>
                  <div>
                    <strong>Asistentes</strong>
                    <p>{detalles.asistentesConfirmados.toLocaleString()} confirmados</p>
                  </div>
                </div>

                <div className="detail-info-item">
                  <span className="detail-icon">🎫</span>
                  <div>
                    <strong>Capacidad</strong>
                    <p>{detalles.capacidadMaxima.toLocaleString()} personas</p>
                  </div>
                </div>

                <div className="detail-info-item">
                  <span className="detail-icon">🏢</span>
                  <div>
                    <strong>Organizador</strong>
                    <p>{detalles.organizador}</p>
                  </div>
                </div>

                <div className="detail-info-item">
                  <span className="detail-icon">💰</span>
                  <div>
                    <strong>Precio</strong>
                    <p>{detalles.precio}</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {detalles && (
            <>
              <div className="detail-section">
                <h3>Descripción</h3>
                <p>{detalles.descripcion}</p>
              </div>

              <div className="detail-section">
                <h3>Requisitos</h3>
                <p>{detalles.requisitos}</p>
              </div>

              <div className="progress-bar">
                <div className="progress-label">
                  <span>Ocupación del evento</span>
                  <span>{Math.round((detalles.asistentesConfirmados / detalles.capacidadMaxima) * 100)}%</span>
                </div>
                <div className="progress-track">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(detalles.asistentesConfirmados / detalles.capacidadMaxima) * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          <button className="btn-reservar" onClick={() => setMostrarModal(true)}>Reservar Entrada</button>
        </div>
      </div>

      {mostrarModal && (
        <ReservaModal 
          evento={eventoBasico}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </div>
  )
}

export default EventDetail
