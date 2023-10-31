const testData = {
  name: 'Cypress Test',
  email: 'cyprest@test.com',
  phone: '5512345678',
  address: 'Calle falsa 123'
}

describe('Components Page', () => {
  it('Visits the Components Page', () => {
    cy.visit('http://localhost:3000/components')
    cy.contains('Checkout').click()

    cy.contains('Nueva orden').click()

    //******** CLIENT INFO SECTION */
    cy.contains('Cliente').click()
    cy.get('input[name="name"]').type(testData.name)
    cy.get('input[name="email"]').type(testData.email)
    cy.get('input[type="tel"]').type(testData.phone)
    cy.get('input[name="address"]').type(testData.address)

    //******** TERMS AND CONDITIONS */
    //** Open signature modal */
    cy.contains('Aceptar terminos y condiciones').click()
    //** open modal to read contract */
    cy.contains('Lea con atención').click()
    //** close contract modal */
    cy.contains('Entiendo y acepto').click()
    //** close signature modal */
    cy.contains('Listo').click()
    //** send client info and close modal */
    cy.contains('Enviar').click()

    //*** MODAL CLIENT CLOSED */
    //*** VERIFY INFO IS CORRECT IN ORDER DETAILS */

    cy.contains('Cliente: ')
    cy.contains('Teléfono: ')
    cy.contains('Teléfono: ')
    cy.contains('Email: ')
    cy.contains('Dirección: ')
    //* Now are not necesary open modal to know client info

    // // cy.get('label[data-testid="contact-client"]').click()
    //// cy.contains('Contactar cliente')
    ////cy.get('button[aria-label="close-modal-Contactar cliente"]').click()
    //// cy.get('a[data-testid="tooltip-phone"]').get('svg')
    //// cy.contains(`Nombre: ${testData.name}`)
    //// cy.contains(`Dirección: ${testData.address}`)

    //******** SHIPPING SECTION */
  })
})
