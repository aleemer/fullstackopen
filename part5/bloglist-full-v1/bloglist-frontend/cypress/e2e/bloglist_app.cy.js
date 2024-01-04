describe('Blog app', () => {
  beforeEach(function() {
    // Clear the testing database and visit the blog site
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // Create the user so a login is possible
    const user = {
      name: 'Matti Luukainen',
      username: 'mluukai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    // Visit site
    cy.visit('http://localhost:5173')

  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('#username').should('exist')
    cy.get('#password').should('exist')
    cy.get('#login-button').should('exist')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('mluukai logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukai')
      cy.get('#password').type('salaenen')
      cy.get('#login-button').click()

      cy.get('#notification').contains('invalid username or password')
    })
  })
})