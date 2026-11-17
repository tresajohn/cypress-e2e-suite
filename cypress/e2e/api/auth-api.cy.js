describe('API — Auth', () => {
  it('POST /Account/v1/GenerateToken returns 200 with valid credentials', () => {
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: Cypress.env('DEMOQA_USERNAME'),
      password: Cypress.env('DEMOQA_PASSWORD'),
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.token).to.be.a('string').and.have.length.greaterThan(0)
      expect(body.status).to.eq('Success')
      expect(body.result).to.eq('User authorized successfully.')
    })
  })

  it('POST /Account/v1/GenerateToken returns 200 with error result for invalid credentials', () => {
    cy.request({
      method: 'POST',
      url: '/Account/v1/GenerateToken',
      body: { userName: 'invalidUser999', password: 'WrongPass@999!' },
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.token).to.be.null
      expect(body.status).to.eq('Failed')
    })
  })

  it('POST /Account/v1/GenerateToken response has required fields', () => {
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: Cypress.env('DEMOQA_USERNAME'),
      password: Cypress.env('DEMOQA_PASSWORD'),
    }).then(({ body }) => {
      expect(body).to.have.all.keys('token', 'expires', 'status', 'result')
    })
  })
})
