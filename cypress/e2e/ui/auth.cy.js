describe('Auth', () => {
  it('logs in via session and lands on profile page', () => {
    cy.loginViaApi()
    cy.visit('/profile')
    cy.get('#userName-value').should('be.visible')
  })
})
