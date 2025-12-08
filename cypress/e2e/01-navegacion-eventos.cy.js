/// <reference types="cypress" />

describe('Prueba E2E 1: Navegación y visualización de eventos', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Debe cargar la página principal y mostrar la lista de eventos', () => {
    // Verificar que el header se carga
    cy.contains('Centro de Eventos').should('be.visible')
    
    // Verificar que se muestra el título de la página
    cy.contains('Descubre Eventos Increíbles').should('be.visible')
    
    // Verificar que hay eventos en la lista
    cy.get('.event-card, .event-card-agotado').should('have.length.at.least', 1)
    
    // Verificar que los eventos muestran información básica
    cy.get('.event-card, .event-card-agotado').first().within(() => {
      cy.get('.event-title').should('be.visible')
      cy.get('.event-image img').should('be.visible')
    })
  })

  it('Debe mostrar los filtros de categorías', () => {
    // Verificar que existen botones de filtro
    cy.get('.filtro-btn').should('have.length.at.least', 2)
    
    // Verificar que el filtro "Todos" está activo por defecto
    cy.contains('button', 'Todos').should('have.class', 'active')
  })

  it('Debe permitir filtrar eventos por categoría', () => {
    // Esperar a que carguen los eventos
    cy.get('.event-card, .event-card-agotado').should('have.length.at.least', 1)
    
    // Obtener el número total de eventos
    cy.get('.event-card, .event-card-agotado').then($eventos => {
      const totalEventos = $eventos.length
      
      // Click en una categoría específica (ej: Conciertos)
      cy.contains('button', 'Conciertos').click()
      
      // Verificar que el botón está activo
      cy.contains('button', 'Conciertos').should('have.class', 'active')
      
      // Verificar que se muestran eventos (puede ser menos que el total)
      cy.get('.event-card, .event-card-agotado').should('exist')
    })
  })

  it('Debe mostrar correctamente el footer', () => {
    // Scroll hacia abajo para ver el footer
    cy.get('footer').scrollIntoView()
    
    // Verificar que el footer es visible
    cy.get('footer').should('be.visible')
    cy.contains('Centro de Eventos').should('be.visible')
  })
})
