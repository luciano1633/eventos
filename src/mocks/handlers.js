import { http, HttpResponse, graphql } from 'msw'

// Datos mock para las pruebas
const mockEventos = [
  {
    id: 1,
    nombre: 'Concierto de Rock',
    fecha: '2024-03-15',
    lugar: 'Estadio Nacional',
    categoria: 'Música',
    imagen: 'https://picsum.photos/400/300?random=1',
    agotado: false
  },
  {
    id: 2,
    nombre: 'Festival de Jazz',
    fecha: '2024-04-20',
    lugar: 'Teatro Municipal',
    categoria: 'Música',
    imagen: 'https://picsum.photos/400/300?random=2',
    agotado: true
  },
  {
    id: 3,
    nombre: 'Conferencia Tech',
    fecha: '2024-05-10',
    lugar: 'Centro de Convenciones',
    categoria: 'Tecnología',
    imagen: 'https://picsum.photos/400/300?random=3',
    agotado: false
  }
]

const mockEventosDetalles = {
  1: {
    id: 1,
    organizador: 'Rock Productions',
    asistentesConfirmados: 1500,
    descripcion: 'Un increíble concierto de rock con las mejores bandas.',
    capacidadMaxima: 2000,
    precio: 15000,
    requisitos: ['Entrada válida', 'Mayor de edad']
  },
  2: {
    id: 2,
    organizador: 'Jazz Events',
    asistentesConfirmados: 800,
    descripcion: 'Festival de jazz con artistas internacionales.',
    capacidadMaxima: 1000,
    precio: 20000,
    requisitos: ['Entrada válida']
  },
  3: {
    id: 3,
    organizador: 'Tech Conferences',
    asistentesConfirmados: 500,
    descripcion: 'Conferencia sobre las últimas tecnologías.',
    capacidadMaxima: 1000,
    precio: 25000,
    requisitos: ['Entrada válida', 'Registro previo']
  }
}

export const handlers = [
  // REST API - GET todos los eventos
  http.get('http://localhost:3001/eventos', () => {
    return HttpResponse.json(mockEventos)
  }),

  // REST API - GET evento específico
  http.get('http://localhost:3001/eventos/:id', ({ params }) => {
    const { id } = params
    const evento = mockEventos.find(e => e.id === parseInt(id))
    
    if (!evento) {
      return new HttpResponse(null, { status: 404 })
    }
    
    return HttpResponse.json(evento)
  }),

  // GraphQL - Query para detalles del evento
  graphql.query('GetEventDetails', ({ variables }) => {
    const { id } = variables
    const detalles = mockEventosDetalles[id]
    
    if (!detalles) {
      return HttpResponse.json({
        errors: [{ message: 'Evento no encontrado' }]
      })
    }
    
    return HttpResponse.json({
      data: {
        eventoDetalle: detalles
      }
    })
  })
]
