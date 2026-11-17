describe('Auth', () => {
  it('logs in with valid credentials', () => {
    cy.loginViaApi()
    cy.visit('/profile')
    cy.get('#userName-value').should('be.visible')
  })

  it('shows error message on invalid credentials', () => {
    cy.visit('/login')
    cy.get('#userName').type('invalidUser999')
    cy.get('#password').type('WrongPass@999!')
    cy.get('#login').click()
    cy.get('#name').should('contain.text', 'Invalid username or password!')
  })

  it('logs out successfully', () => {
    cy.loginViaApi()
    cy.visit('/profile')
    cy.get('#submit').click()
    cy.url().should('include', '/login')
  })
})
