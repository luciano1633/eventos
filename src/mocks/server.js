import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Configurar el servidor de MSW con los handlers
export const server = setupServer(...handlers)
