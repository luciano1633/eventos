/// <reference types="cypress" />

describe('Prueba E2E 3: Modal de reserva de entradas', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe abrir el modal de reserva al hacer click en Reservar Entrada', () => {
    // Navegar a un evento disponible (evento 4 tiene entradas)
    cy.visit('/evento/4')
    
    // Esperar a que cargue el botón de reserva
    cy.get('.btn-reservar', { timeout: 10000 }).should('be.visible')
    
    // Click en el botón de reservar
    cy.get('.btn-reservar').click()
    
    // Verificar que se abre el modal
    cy.get('.modal-overlay').should('be.visible')
    cy.contains('Reservar Entradas').should('be.visible')
  })

  it('Debe mostrar el formulario de reserva con todos los campos', () => {
    // Navegar a un evento y abrir modal
    cy.visit('/evento/4')
    cy.get('.btn-reservar', { timeout: 10000 }).click()
    
    // Verificar que existen todos los campos del formulario
    cy.get('input[name="nombre"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="telefono"]').should('be.visible')
    cy.get('select[name="cantidadEntradas"]').should('be.visible')
    
    // Verificar que hay un botón de confirmar (con scroll si es necesario)
    cy.contains('button', 'Confirmar Reserva').scrollIntoView().should('be.visible')
  })

  it('Debe permitir llenar el formulario de reserva', () => {
    // Navegar a un evento y abrir modal
    cy.visit('/evento/4')
    cy.get('.btn-reservar', { timeout: 10000 }).click()
    
    // Llenar el formulario
    cy.get('input[name="nombre"]').type('Juan Pérez')
    cy.get('input[name="email"]').type('juan@example.com')
    cy.get('input[name="telefono"]').type('+56912345678')
    cy.get('select[name="cantidadEntradas"]').select('2')
    
    // Verificar que los campos tienen los valores
    cy.get('input[name="nombre"]').should('have.value', 'Juan Pérez')
    cy.get('input[name="email"]').should('have.value', 'juan@example.com')
    cy.get('input[name="telefono"]').should('have.value', '+56912345678')
    cy.get('select[name="cantidadEntradas"]').should('have.value', '2')
  })

  it('Debe mostrar mensaje de éxito al confirmar la reserva', () => {
    // Navegar a un evento y abrir modal
    cy.visit('/evento/4')
    cy.get('.btn-reservar', { timeout: 10000 }).click()
    
    // Llenar el formulario
    cy.get('input[name="nombre"]').type('María González')
    cy.get('input[name="email"]').type('maria@example.com')
    cy.get('input[name="telefono"]').type('+56987654321')
    
    // Enviar el formulario
    cy.contains('button', 'Confirmar Reserva').click()
    
    // Verificar mensaje de éxito
    cy.contains('¡Reserva Exitosa!', { timeout: 5000 }).should('be.visible')
    cy.contains('maria@example.com').should('be.visible')
  })

  it('Debe cerrar el modal al hacer click en la X', () => {
    // Navegar a un evento y abrir modal
    cy.visit('/evento/4')
    cy.get('.btn-reservar', { timeout: 10000 }).click()
    
    // Verificar que el modal está abierto
    cy.get('.modal-overlay').should('be.visible')
    
    // Click en el botón de cerrar
    cy.get('.modal-close').click()
    
    // Verificar que el modal se cerró
    cy.get('.modal-overlay').should('not.exist')
  })
})
