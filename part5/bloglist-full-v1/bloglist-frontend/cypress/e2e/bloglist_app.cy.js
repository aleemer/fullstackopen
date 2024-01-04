describe('template spec', () => {
  it('front page can be opened', function() {
    cy.visit('http://localhost:5173')
    cy.contains('log in to application')
  })
})