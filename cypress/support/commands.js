Cypress.Commands.add('loginViaApi', () => {
  cy.session('demoqa-user-' + Cypress.env('DEMOQA_USERNAME'), () => {
    cy.visit('/login')
    cy.get('#userName').type(Cypress.env('DEMOQA_USERNAME'))
    cy.get('#password').type(Cypress.env('DEMOQA_PASSWORD'))
    cy.get('#login').click()
    cy.get('#userName-value', { timeout: 10000 }).should('be.visible')
  })
})

Cypress.Commands.add('getAuthToken', () => {
  return cy.request('POST', '/Account/v1/GenerateToken', {
    userName: Cypress.env('DEMOQA_USERNAME'),
    password: Cypress.env('DEMOQA_PASSWORD'),
  }).then(({ body }) => body.token)
})
