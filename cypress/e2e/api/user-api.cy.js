describe('API — User', () => {
  beforeEach(function () {
    cy.request('POST', '/Account/v1/GenerateToken', {
      userName: Cypress.env('DEMOQA_USERNAME'),
      password: Cypress.env('DEMOQA_PASSWORD'),
    }).then(({ body }) => {
      this.token = body.token
    })
  })

  it('GET /Account/v1/User/:uuid returns 200 for authenticated user', function () {
    cy.request({
      method: 'GET',
      url: '/Account/v1/User/eab6cfb5-b997-4bc7-8e14-722058e75791',
      headers: { Authorization: 'Bearer ' + this.token },
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.username).to.eq(Cypress.env('DEMOQA_USERNAME'))
    })
  })

  it('GET /Account/v1/User/:uuid returns 401 without token', () => {
    cy.request({
      method: 'GET',
      url: '/Account/v1/User/eab6cfb5-b997-4bc7-8e14-722058e75791',
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(401)
    })
  })

  it('GET /Account/v1/User/:uuid response has required user fields', function () {
    cy.request({
      method: 'GET',
      url: '/Account/v1/User/eab6cfb5-b997-4bc7-8e14-722058e75791',
      headers: { Authorization: 'Bearer ' + this.token },
    }).then(({ body }) => {
      expect(body).to.have.all.keys('userId', 'username', 'books')
      expect(body.books).to.be.an('array')
    })
  })
})
