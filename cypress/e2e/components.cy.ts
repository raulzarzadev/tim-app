describe('Components Page', () => {
  it('Visits the Components Page', () => {
    cy.visit('http://localhost:3000/components')
    cy.contains('orden').click()
  })
})
