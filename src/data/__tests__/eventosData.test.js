import { eventosMock, eventosDetallesMock } from '../eventosData'

describe('eventosData', () => {
  test('eventosMock contiene eventos', () => {
    expect(eventosMock).toBeDefined()
    expect(Array.isArray(eventosMock)).toBe(true)
    expect(eventosMock.length).toBeGreaterThan(0)
  })

  test('cada evento tiene las propiedades requeridas', () => {
    eventosMock.forEach(evento => {
      expect(evento).toHaveProperty('id')
      expect(evento).toHaveProperty('nombre')
      expect(evento).toHaveProperty('fecha')
      expect(evento).toHaveProperty('lugar')
      expect(evento).toHaveProperty('categoria')
      expect(evento).toHaveProperty('imagen')
      expect(evento).toHaveProperty('agotado')
    })
  })

  test('eventosDetallesMock contiene detalles', () => {
    expect(eventosDetallesMock).toBeDefined()
    expect(typeof eventosDetallesMock).toBe('object')
  })

  test('cada detalle de evento tiene las propiedades correctas', () => {
    Object.values(eventosDetallesMock).forEach(detalle => {
      expect(detalle).toHaveProperty('id')
      expect(detalle).toHaveProperty('organizador')
      expect(detalle).toHaveProperty('asistentesConfirmados')
      expect(detalle).toHaveProperty('descripcion')
      expect(detalle).toHaveProperty('capacidadMaxima')
      expect(detalle).toHaveProperty('precio')
      expect(detalle).toHaveProperty('requisitos')
    })
  })

  test('los IDs de eventosDetallesMock coinciden con los de eventosMock', () => {
    const mockIds = eventosMock.map(e => e.id)
    const detallesIds = Object.values(eventosDetallesMock).map(d => d.id)
    
    detallesIds.forEach(id => {
      expect(mockIds).toContain(id)
    })
  })
})
