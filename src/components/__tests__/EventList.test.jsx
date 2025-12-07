import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import EventList from '../EventList'

const RouterWrapper = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>
}

describe('EventList Component', () => {
  test('muestra spinner de carga inicialmente', () => {
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    expect(screen.getByText('Cargando eventos...')).toBeInTheDocument()
  })

  test('renderiza la lista de eventos después de cargar', async () => {
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    // Esperar a que se carguen los eventos
    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    })

    expect(screen.getByText('Festival de Jazz')).toBeInTheDocument()
    expect(screen.getByText('Conferencia Tech')).toBeInTheDocument()
  })

  test('muestra el título y descripción de la página', async () => {
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Descubre Eventos Increíbles')).toBeInTheDocument()
    })

    expect(screen.getByText('Explora los mejores conciertos, conferencias y más')).toBeInTheDocument()
  })

  test('muestra todos los botones de filtro', async () => {
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Todos')).toBeInTheDocument()
    })

    expect(screen.getByText('Música')).toBeInTheDocument()
    expect(screen.getByText('Tecnología')).toBeInTheDocument()
  })

  test('filtra eventos por categoría al hacer clic en un filtro', async () => {
    const user = userEvent.setup()
    
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    // Esperar a que carguen los eventos
    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    })

    // Click en filtro de Tecnología
    const filtroTech = screen.getByText('Tecnología')
    await user.click(filtroTech)

    // Solo debe mostrar eventos de Tecnología
    await waitFor(() => {
      expect(screen.getByText('Conferencia Tech')).toBeInTheDocument()
      expect(screen.queryByText('Concierto de Rock')).not.toBeInTheDocument()
      expect(screen.queryByText('Festival de Jazz')).not.toBeInTheDocument()
    })
  })

  test('vuelve a mostrar todos los eventos al hacer clic en "Todos"', async () => {
    const user = userEvent.setup()
    
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    })

    // Filtrar por Tecnología
    const filtroTech = screen.getByText('Tecnología')
    await user.click(filtroTech)

    await waitFor(() => {
      expect(screen.queryByText('Concierto de Rock')).not.toBeInTheDocument()
    })

    // Volver a Todos
    const filtroTodos = screen.getByText('Todos')
    await user.click(filtroTodos)

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
      expect(screen.getByText('Festival de Jazz')).toBeInTheDocument()
      expect(screen.getByText('Conferencia Tech')).toBeInTheDocument()
    })
  })

  test('aplica clase active al filtro seleccionado', async () => {
    const user = userEvent.setup()
    
    render(
      <RouterWrapper>
        <EventList />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Todos')).toBeInTheDocument()
    })

    const filtroTodos = screen.getByText('Todos')
    expect(filtroTodos).toHaveClass('active')

    const filtroMusica = screen.getByText('Música')
    await user.click(filtroMusica)

    await waitFor(() => {
      expect(filtroMusica).toHaveClass('active')
      expect(filtroTodos).not.toHaveClass('active')
    })
  })

})
