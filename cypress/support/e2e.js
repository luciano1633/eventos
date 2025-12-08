// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Ignorar errores de aplicación que no afectan las pruebas E2E
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar error de eventos.map cuando la API no responde correctamente
  if (err.message.includes('eventos.map is not a function')) {
    return false
  }
  // Permitir que otros errores fallen las pruebas
  return true
})
