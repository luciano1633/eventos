import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import userEvent from '@testing-library/user-event'
import EventDetail from '../EventDetail'

// Configurar Apollo Client para pruebas
const createMockApolloClient = () => {
  return new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
  })
}

const RouterWrapper = ({ children, initialRoute = '/evento/1' }) => {
  return (
    <ApolloProvider client={createMockApolloClient()}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Routes>
          <Route path="/evento/:id" element={children} />
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </MemoryRouter>
    </ApolloProvider>
  )
}

describe('EventDetail Component', () => {
  test('muestra spinner de carga inicialmente', () => {
    render(
      <RouterWrapper>
        <EventDetail />
      </RouterWrapper>
    )

    expect(screen.getByText('Cargando detalles del evento...')).toBeInTheDocument()
  })

  test('renderiza los detalles del evento después de cargar', async () => {
    render(
      <RouterWrapper>
        <EventDetail />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(screen.getByText('Estadio Nacional')).toBeInTheDocument()
  })

  test('muestra el botón de volver a eventos', async () => {
    render(
      <RouterWrapper>
        <EventDetail />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('← Volver a Eventos')).toBeInTheDocument()
    })
  })

  test('formatea la fecha correctamente', async () => {
    render(
      <RouterWrapper>
        <EventDetail />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText(/15 de marzo de 2024/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  test('renderiza evento agotado correctamente', async () => {
    render(
      <RouterWrapper initialRoute="/evento/2">
        <EventDetail />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Festival de Jazz')).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(screen.getByText('AGOTADO')).toBeInTheDocument()
    expect(screen.getByText(/Entradas Agotadas/i)).toBeInTheDocument()
  })

  test('muestra mensaje de evento no encontrado para ID inválido', async () => {
    render(
      <RouterWrapper initialRoute="/evento/999">
        <EventDetail />
      </RouterWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText('Evento no encontrado')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
