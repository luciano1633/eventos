import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import EventCard from '../EventCard'

// Wrapper para componentes que usan React Router
const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('EventCard Component', () => {
  const mockEvento = {
    id: 1,
    nombre: 'Concierto de Rock',
    fecha: '2024-03-15',
    lugar: 'Estadio Nacional',
    categoria: 'Música',
    imagen: 'https://picsum.photos/400/300?random=1',
    agotado: false
  }

  const mockEventoAgotado = {
    id: 2,
    nombre: 'Festival de Jazz',
    fecha: '2024-04-20',
    lugar: 'Teatro Municipal',
    categoria: 'Música',
    imagen: 'https://picsum.photos/400/300?random=2',
    agotado: true
  }

  test('renderiza correctamente un evento disponible', () => {
    render(
      <RouterWrapper>
        <EventCard evento={mockEvento} />
      </RouterWrapper>
    )

    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    expect(screen.getByText('Estadio Nacional')).toBeInTheDocument()
    expect(screen.getByText('Música')).toBeInTheDocument()
    expect(screen.getByText('Ver Detalles')).toBeInTheDocument()
  })

  test('renderiza correctamente un evento agotado', () => {
    render(
      <RouterWrapper>
        <EventCard evento={mockEventoAgotado} />
      </RouterWrapper>
    )

    expect(screen.getByText('Festival de Jazz')).toBeInTheDocument()
    expect(screen.getByText('Teatro Municipal')).toBeInTheDocument()
    expect(screen.getByText('AGOTADO')).toBeInTheDocument()
    expect(screen.getByText('🔔 Nuevas fechas próximamente')).toBeInTheDocument()
    expect(screen.queryByText('Ver Detalles')).not.toBeInTheDocument()
  })

  test('formatea la fecha correctamente', () => {
    render(
      <RouterWrapper>
        <EventCard evento={mockEvento} />
      </RouterWrapper>
    )

    // La fecha "2024-03-15" debe mostrarse como "15 de marzo de 2024"
    expect(screen.getByText(/15 de marzo de 2024/i)).toBeInTheDocument()
  })

  test('muestra la imagen del evento', () => {
    render(
      <RouterWrapper>
        <EventCard evento={mockEvento} />
      </RouterWrapper>
    )

    const imagen = screen.getByAltText('Concierto de Rock')
    expect(imagen).toBeInTheDocument()
    expect(imagen).toHaveAttribute('src', mockEvento.imagen)
  })

  test('el evento disponible tiene enlace a los detalles', () => {
    render(
      <RouterWrapper>
        <EventCard evento={mockEvento} />
      </RouterWrapper>
    )

    const links = screen.queryAllByRole('link')
    const eventLink = links.find(link => link.getAttribute('href')?.includes('/evento/1'))
    expect(eventLink).toBeDefined()
  })

  test('el evento agotado no tiene clase de enlace clickeable', () => {
    const { container } = render(
      <RouterWrapper>
        <EventCard evento={mockEventoAgotado} />
      </RouterWrapper>
    )

    const card = container.querySelector('.event-card-agotado')
    expect(card).toBeInTheDocument()
  })
})
