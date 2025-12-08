/// <reference types="cypress" />

describe('Prueba E2E 4: Flujo completo de usuario', () => {
  it('Debe completar el flujo completo: navegar, filtrar, ver detalles y reservar', () => {
    // 1. Visitar la página principal
    cy.visit('/')
    
    // Verificar que carga correctamente
    cy.contains('Descubre Eventos Increíbles').should('be.visible')
    
    // 2. Filtrar eventos por una categoría
    cy.contains('button', 'Conciertos').click()
    cy.contains('button', 'Conciertos').should('have.class', 'active')
    
    // 3. Ver que hay eventos después del filtro
    cy.get('.event-card, .event-card-agotado').should('have.length.at.least', 1)
    
    // 4. Click en un evento disponible (no agotado)
    cy.get('.event-card').not('.event-card-agotado').first().click()
    
    // 5. Verificar que navega a la página de detalles
    cy.url().should('include', '/evento/')
    
    // 6. Verificar que se muestra información del evento
    cy.get('.detail-title').should('be.visible')
    
    // 7. Abrir el modal de reserva
    cy.get('.btn-reservar', { timeout: 10000 }).click()
    
    // 8. Llenar el formulario
    cy.get('input[name="nombre"]').type('Usuario Cypress')
    cy.get('input[name="email"]').type('cypress@test.com')
    cy.get('input[name="telefono"]').type('+56911111111')
    cy.get('select[name="cantidadEntradas"]').select('3')
    
    // 9. Confirmar la reserva
    cy.contains('button', 'Confirmar Reserva').click()
    
    // 10. Verificar mensaje de éxito
    cy.contains('¡Reserva Exitosa!', { timeout: 5000 }).should('be.visible')
    
    // 11. Esperar a que el modal se cierre automáticamente
    cy.wait(3000)
    
    // 12. Verificar que regresamos a la página de detalles
    cy.url().should('include', '/evento/')
  })

  it('Debe navegar entre múltiples eventos', () => {
    // Visitar la página principal
    cy.visit('/')
    
    // Ver el primer evento disponible (no agotado)
    cy.get('.event-card').not('.event-card-agotado').first().click()
    cy.url().should('include', '/evento/')
    
    // Volver a la lista
    cy.contains('Volver a Eventos').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    
    // Ver el segundo evento disponible (no agotado)
    cy.get('.event-card').not('.event-card-agotado').eq(1).then($cards => {
      if ($cards.length > 0) {
        cy.get('.event-card').not('.event-card-agotado').eq(1).click()
        cy.url().should('include', '/evento/')
      }
    })
  })

  it('Debe manejar correctamente la navegación responsive', () => {
    // Probar en viewport móvil
    cy.viewport('iphone-x')
    cy.visit('/')
    
    // Verificar que el contenido se muestra correctamente
    cy.contains('Centro de Eventos').should('be.visible')
    cy.get('.event-card, .event-card-agotado').should('be.visible')
    
    // Cambiar a tablet
    cy.viewport('ipad-2')
    cy.reload()
    cy.contains('Centro de Eventos').should('be.visible')
    
    // Cambiar a desktop
    cy.viewport(1280, 720)
    cy.reload()
    cy.contains('Centro de Eventos').should('be.visible')
  })

  it('Debe validar que todos los eventos tienen imagen', () => {
    cy.visit('/')
    
    // Verificar que todos los eventos tienen imagen
    cy.get('.event-card, .event-card-agotado').each($card => {
      cy.wrap($card).within(() => {
        cy.get('.event-image img').should('have.attr', 'src')
          .and('not.be.empty')
      })
    })
  })
})
