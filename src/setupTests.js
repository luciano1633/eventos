import '@testing-library/jest-dom'
import 'whatwg-fetch'
import { server } from './mocks/server'

// Establecer servidor MSW antes de todas las pruebas
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// Resetear handlers después de cada prueba
afterEach(() => server.resetHandlers())

// Limpiar después de todas las pruebas
afterAll(() => server.close())

// Mock de import.meta.env
global.import = {
  meta: {
    env: {
      MODE: 'test',
    },
  },
}
