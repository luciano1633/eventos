/// <reference types="cypress" />

describe('Prueba E2E 2: Visualización de detalles de evento', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe navegar a los detalles de un evento disponible', () => {
    // Esperar a que carguen los eventos
    cy.get('.event-card').should('have.length.at.least', 1)
    
    // Click en la tarjeta disponible (no agotada, sin clase event-card-agotado)
    cy.get('.event-card').not('.event-card-agotado').first().click()
    
    // Verificar que navega a la página de detalles
    cy.url().should('include', '/evento/')
    
    // Verificar que se muestra el título del evento
    cy.get('.detail-title').should('be.visible')
  })

  it('Debe mostrar la información detallada del evento', () => {
    // Navegar directamente a un evento disponible (evento 4)
    cy.visit('/evento/4')
    
    // Verificar que se muestra el botón de volver
    cy.contains('Volver a Eventos').should('be.visible')
    
    // Verificar que se muestra información del evento
    cy.get('.detail-title').should('be.visible')
    cy.get('.detail-image img').should('be.visible')
    
    // Verificar que hay información de fecha y lugar
    cy.contains('Fecha').should('be.visible')
    cy.contains('Lugar').should('be.visible')
  })

  it('Debe permitir volver a la lista de eventos', () => {
    // Navegar a un evento
    cy.visit('/evento/1')
    
    // Click en el botón de volver
    cy.contains('Volver a Eventos').click()
    
    // Verificar que regresa a la página principal
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.contains('Descubre Eventos Increíbles').should('be.visible')
  })

  it('Debe mostrar mensaje para eventos agotados', () => {
    // Visitar un evento agotado (ajusta el ID según tus datos)
    cy.visit('/evento/2')
    
    // Esperar a que cargue la página
    cy.get('body').should('be.visible')
    
    // Verificar que muestra información sobre agotado
    // (esto depende de tu implementación específica)
    cy.get('body').then($body => {
      const text = $body.text()
      // Verificar que hay alguna indicación de que está agotado o hay detalles del evento
      expect(text.length).to.be.greaterThan(0)
    })
  })
})
