// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- Este comando visita la página principal --
Cypress.Commands.add('visitHome', () => {
  cy.visit('/')
})

// -- Comando para esperar que la página cargue --
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
})
