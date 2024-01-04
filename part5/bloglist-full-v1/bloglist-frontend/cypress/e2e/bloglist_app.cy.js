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

  describe('When logged in', function() {
    beforeEach(function() {
      // perform a login
      cy.get('#username').type('mluukai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      // open the blog form
      cy.get('#toggle-button').click()
      // type in details
      cy.get('#title').type('Another blog')
      cy.get('#author').type('Gray Prince')
      cy.get('#url').type('http://www.test.com')
      cy.get('#create-button').click()

      // blog must be present
      cy.contains('Another blog Gray Prince')
    })

    describe('Blog created', function() {
      beforeEach(function() {
        // open the blog form
        cy.get('#toggle-button').click()
        // type in details
        cy.get('#title').type('Another blog')
        cy.get('#author').type('Gray Prince')
        cy.get('#url').type('http://www.test.com')
        cy.get('#create-button').click()
      })

      it('User can like a blog', function() {
        // Open details
        cy.get('#view-details').click()
        // Like blog & confirm
        cy.get('#like-blog').click()
        cy.contains('likes 1')
      })

      it('Creator can delete blog', function() {
        // Open details
        cy.get('#view-details').click()
        // Perform deletion
        cy.get('#remove-blog').click()
        // Confirm deletion
        cy.get('.default-blog-display').should('not.exist')
        cy.get('.hidden-blog-display').should('not.exist')
      })
    })

    describe('Blog created and user logged out', function() {
      beforeEach(function() {
        // open the blog form
        cy.get('#toggle-button').click()
        // type in details
        cy.get('#title').type('Another blog')
        cy.get('#author').type('Gray Prince')
        cy.get('#url').type('http://www.test.com')
        cy.get('#create-button').click()

        cy.get('#logout-button').click()
      })

      it('Only creator can see delete button', function() {
        // create new user and login
        const altUser = {
          name: 'Aleem Tariq',
          username: 'aleemer',
          password: 'djinn'
        }
        cy.request('POST', 'http://localhost:3001/api/users', altUser)

        // perform a login
        cy.get('#username').type('aleemer')
        cy.get('#password').type('djinn')
        cy.get('#login-button').click()

        // View blog
        cy.get('#view-details').click()
        // Cannot see remove button
        cy.get('#remove-button').should('not.exist')
      })
    })
  })
})