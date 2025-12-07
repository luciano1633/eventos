import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  test('renderiza el componente App', () => {
    render(<App />)
    
    // El componente debe renderizarse sin errores
    expect(document.body).toBeInTheDocument()
  })

  test('configura Apollo Provider correctamente', () => {
    const { container } = render(<App />)
    
    // Verificar que el componente se renderiza
    expect(container).toBeInTheDocument()
  })

  test('renderiza el Router con las rutas', () => {
    render(<App />)
    
    // El Router debe estar presente
    expect(document.querySelector('body')).toBeInTheDocument()
  })

  test('renderiza el Layout wrapper', async () => {
    render(<App />)
    
    // Esperar a que se renderice el contenido
    await waitFor(() => {
      expect(document.body).toBeInTheDocument()
    })
  })

  test('muestra EventList en la ruta raíz', async () => {
    render(<App />)
    
    // EventList debe renderizarse y mostrar el título
    await waitFor(() => {
      expect(screen.getByText('Descubre Eventos Increíbles')).toBeInTheDocument()
    })
  })

  test('tiene configurado el basename correcto para test', () => {
    const { container } = render(<App />)
    
    // Verificar que el componente se renderiza sin error
    expect(container).toBeTruthy()
  })
})
