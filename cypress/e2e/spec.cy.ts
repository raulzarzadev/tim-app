describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('BajaRent')
    cy.contains('Renta de todo')
  })
})
