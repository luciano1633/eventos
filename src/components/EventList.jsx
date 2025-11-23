import { useState, useEffect } from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import { eventosMock } from '../data/eventosData'
import '../css/EventList.css'

function EventList() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState('Todos')
  const [usandoMock, setUsandoMock] = useState(false)

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        // Intentar cargar desde API REST primero
        const response = await axios.get('http://localhost:3001/eventos', { timeout: 2000 })
        setEventos(response.data)
        setUsandoMock(false)
        setLoading(false)
      } catch (err) {
        // Si falla (ej: GitHub Pages), usar datos mock
        console.log('API REST no disponible, usando datos mock')
        setEventos(eventosMock)
        setUsandoMock(true)
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

  return (
    <div className="container">
      {usandoMock && (
        <div className="modo-demo-banner">
          ℹ️ Modo Demo - Para ver las APIs mock funcionando, ejecuta localmente con los servidores
        </div>
      )}
      
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
