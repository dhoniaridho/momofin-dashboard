// https://docs.cypress.io/api/introduction/api.html

describe('Login Page', () => {
  it('visits login url', () => {
    cy.visit('/login')
    cy.contains('h2', 'Login ke Akun Anda')
  })
  it('user can login', () => {
    cy.get('[placeholder="Email"]').type('emet@momofin.com')
    cy.get('[type="password"]').type('momofin2022')
    cy.get('button').click()
    cy.contains('h2', 'Dashboard')
  })
})
