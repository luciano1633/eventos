import { useState, useEffect } from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import '../css/EventList.css'

function EventList() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3001/eventos')
        setEventos(response.data)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los eventos. Asegúrate de que el servidor esté ejecutándose.')
        setLoading(false)
      }
    }

    fetchEventos()
  }, [])

  const categorias = ['Todos', ...new Set(eventos.map(e => e.categoria))]
  
  const eventosFiltrados = filtroCategoria === 'Todos' 
    ? eventos 
    : eventos.filter(e => e.categoria === filtroCategoria)

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando eventos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p>⚠️ {error}</p>
          <p className="error-hint">Ejecuta: <code>npx json-server server/db.json --port 3001</code></p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header">
        <h2>Descubre Eventos Increíbles</h2>
        <p>Explora los mejores conciertos, conferencias y más</p>
      </div>

      <div className="filtros">
        {categorias.map(categoria => (
          <button
            key={categoria}
            className={`filtro-btn ${filtroCategoria === categoria ? 'active' : ''}`}
            onClick={() => setFiltroCategoria(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="eventos-grid">
        {eventosFiltrados.map(evento => (
          <EventCard key={evento.id} evento={evento} />
        ))}
      </div>

      {eventosFiltrados.length === 0 && (
        <div className="no-eventos">
          <p>No se encontraron eventos en esta categoría.</p>
        </div>
      )}
    </div>
  )
}

export default EventList
