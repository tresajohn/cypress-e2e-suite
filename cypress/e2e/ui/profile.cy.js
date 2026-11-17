describe('Profile', () => {
  beforeEach(() => {
    cy.loginViaApi()
    cy.visit('/profile')
  })

  it('displays username on profile page', () => {
    cy.fixture('testUser').then(user => {
      cy.get('#userName-value').should('contain.text', user.username)
    })
  })

  it('shows Go To Book Store button on profile', () => {
    cy.get('#gotoStore').should('be.visible')
  })

  it('navigates to book store from profile', () => {
    cy.get('#gotoStore').click()
    cy.url().should('include', '/books')
  })
})
