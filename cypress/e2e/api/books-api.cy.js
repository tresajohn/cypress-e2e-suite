describe('API — Books', () => {
  let addedIsbn

  beforeEach(function () {
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: Cypress.env('DEMOQA_USERNAME'),
      password: Cypress.env('DEMOQA_PASSWORD'),
    }).then(({ body }) => {
      this.token = body.token
    })
  })

  it('GET /BookStore/v1/Books returns book list', () => {
    cy.request('GET', '/BookStore/v1/Books').then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.books).to.be.an('array').and.have.length.greaterThan(0)
    })
  })

  it('GET /BookStore/v1/Books response books have required fields', () => {
    cy.request('GET', '/BookStore/v1/Books').then(({ body }) => {
      const book = body.books[0]
      expect(book).to.have.all.keys('isbn', 'title', 'subTitle', 'author', 'publish_date', 'publisher', 'pages', 'description', 'website')
    })
  })

  it('POST /BookStore/v1/Books adds a book to the user collection', function () {
    const isbn = '9781449325862'
    addedIsbn = isbn
    cy.request({
      method: 'POST',
      url: '/BookStore/v1/Books',
      headers: { Authorization: 'Bearer ' + this.token },
      body: {
        userId: 'eab6cfb5-b997-4bc7-8e14-722058e75791',
        collectionOfIsbns: [{ isbn }],
      },
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body.books).to.be.an('array')
      expect(body.books[0].isbn).to.eq(isbn)
    })
  })

  it('GET /Account/v1/User/:uuid shows added book in collection', function () {
    if (!addedIsbn) return
    cy.request({
      method: 'GET',
      url: '/Account/v1/User/eab6cfb5-b997-4bc7-8e14-722058e75791',
      headers: { Authorization: 'Bearer ' + this.token },
    }).then(({ body }) => {
      const isbns = body.books.map(b => b.isbn)
      expect(isbns).to.include(addedIsbn)
    })
  })

  after(function () {
    if (!addedIsbn) return
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: Cypress.env('DEMOQA_USERNAME'),
      password: Cypress.env('DEMOQA_PASSWORD'),
    }).then(({ body }) => {
      cy.request({
        method: 'DELETE',
        url: '/BookStore/v1/Book',
        headers: { Authorization: 'Bearer ' + body.token },
        body: {
          isbn: addedIsbn,
          userId: 'eab6cfb5-b997-4bc7-8e14-722058e75791',
        },
        failOnStatusCode: false,
      })
    })
  })
})
