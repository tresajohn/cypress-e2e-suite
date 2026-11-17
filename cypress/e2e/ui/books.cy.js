describe('Books', () => {
  let addedIsbn

  it('displays book list in the store', () => {
    cy.visit('/books')
    cy.get('.books-wrapper tbody tr').should('have.length.greaterThan', 0)
  })

  it('navigates to and reads a book detail page', () => {
    cy.visit('/books')
    cy.get('.books-wrapper tbody tr').first().find('a').click()
    cy.url().should('include', '/books?search=')
    cy.get('#ISBN-wrapper').should('be.visible')
  })

  it('adds a book to profile collection', () => {
    cy.loginViaApi()
    cy.visit('/books')
    cy.get('.books-wrapper tbody tr').first().find('a').then($link => {
      const isbn = new URL('https://demoqa.com' + $link.attr('href')).searchParams.get('search')
      addedIsbn = isbn
    })
    cy.get('.books-wrapper tbody tr').first().find('a').click()
    cy.get('#addNewRecordButton').click()
    cy.on('window:alert', () => true)
    cy.visit('/profile')
    cy.get('#books-wrapper').should('be.visible')
  })

  after(() => {
    if (addedIsbn) {
      cy.getAuthToken().then(token => {
        cy.request({
          method: 'DELETE',
          url: '/BookStore/v1/Book',
          headers: { Authorization: 'Bearer ' + token },
          body: {
            isbn: addedIsbn,
            userId: 'eab6cfb5-b997-4bc7-8e14-722058e75791',
          },
          failOnStatusCode: false,
        })
      })
    }
  })
})
