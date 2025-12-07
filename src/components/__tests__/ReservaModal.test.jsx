import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ReservaModal from '../ReservaModal'

describe('ReservaModal Component', () => {
  const mockEvento = {
    id: 1,
    nombre: 'Concierto de Rock',
    fecha: '2024-03-15',
    lugar: 'Estadio Nacional',
    categoria: 'Música'
  }

  const mockOnClose = jest.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
  })

  test('renderiza el modal con el formulario', () => {
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    expect(screen.getByText('Reservar Entradas')).toBeInTheDocument()
    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument()
  })

  test('cierra el modal al hacer clic en el botón de cerrar', async () => {
    const user = userEvent.setup()
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    const closeButton = screen.getByText('×')
    await user.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('cierra el modal al hacer clic en el overlay', async () => {
    const user = userEvent.setup()
    const { container } = render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    const overlay = container.querySelector('.modal-overlay')
    await user.click(overlay)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  test('no cierra el modal al hacer clic en el contenido', async () => {
    const user = userEvent.setup()
    const { container } = render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    const content = container.querySelector('.modal-content')
    await user.click(content)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  test('actualiza los campos del formulario al escribir', async () => {
    const user = userEvent.setup()
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    const nombreInput = screen.getByLabelText(/nombre completo/i)
    const emailInput = screen.getByLabelText(/email/i)
    const telefonoInput = screen.getByLabelText(/teléfono/i)

    await user.type(nombreInput, 'Juan Pérez')
    await user.type(emailInput, 'juan@example.com')
    await user.type(telefonoInput, '+56912345678')

    expect(nombreInput).toHaveValue('Juan Pérez')
    expect(emailInput).toHaveValue('juan@example.com')
    expect(telefonoInput).toHaveValue('+56912345678')
  })

  test('muestra mensaje de éxito después de enviar el formulario', async () => {
    const user = userEvent.setup()
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    // Llenar el formulario
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/teléfono/i), '+56912345678')

    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /confirmar reserva/i })
    await user.click(submitButton)

    // Verificar mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText('¡Reserva Exitosa!')).toBeInTheDocument()
    })

    expect(screen.getByText(/hemos enviado la confirmación a juan@example.com/i)).toBeInTheDocument()
    expect(screen.getByText('Concierto de Rock')).toBeInTheDocument()
  })

  test('cierra el modal automáticamente después del éxito', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ delay: null })
    
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    // Llenar y enviar el formulario
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/teléfono/i), '+56912345678')
    
    const submitButton = screen.getByRole('button', { name: /confirmar reserva/i })
    await user.click(submitButton)

    // Avanzar el tiempo
    jest.advanceTimersByTime(2500)

    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled()
    })

    jest.useRealTimers()
  })

  test('requiere todos los campos para enviar', async () => {
    const user = userEvent.setup()
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    const submitButton = screen.getByRole('button', { name: /confirmar reserva/i })
    await user.click(submitButton)

    // El formulario no debe enviarse sin llenar los campos requeridos
    expect(screen.queryByText('¡Reserva Exitosa!')).not.toBeInTheDocument()
  })

  test('calcula el precio total correctamente', async () => {
    const user = userEvent.setup()
    render(<ReservaModal evento={mockEvento} onClose={mockOnClose} />)

    // Llenar el formulario
    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/email/i), 'juan@example.com')
    await user.type(screen.getByLabelText(/teléfono/i), '+56912345678')

    // Enviar el formulario
    const submitButton = screen.getByRole('button', { name: /confirmar reserva/i })
    await user.click(submitButton)

    // Verificar precio total (1 entrada * 15000)
    await waitFor(() => {
      expect(screen.getByText(/total:/i)).toBeInTheDocument()
      expect(screen.getByText(/\$15\.000/i)).toBeInTheDocument()
    })
  })
})
