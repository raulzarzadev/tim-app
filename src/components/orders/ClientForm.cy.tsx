import React from 'react'
import ClientForm from './ClientForm'

const client_data = {
  name: 'Joe Dea',
  phone: '+52 123 456 789',
  email: 'joe@de.com',
  address: '123 Main St'
}
describe('<ClientForm />', () => {
  beforeEach(() => {})
  it('render properly', () => {
    cy.mount(<ClientForm client={client_data} />)
    cy.get('input[name="name"]')
      .should('exist')
      .should('have.value', client_data.name)

    // Verifica que el campo "Email" esté presente y muestra valores esperados
    cy.get('input[name="email"]')
      .should('exist')
      .should('have.value', client_data.email)

    // Verifica que el campo "Teléfono" esté presente y muestra valores esperados
    cy.get('input[name="phone"]')
      .should('exist')
      .should('have.value', client_data.phone)

    // Verifica que el campo "Dirección" esté presente y muestra valores esperados
    cy.get('input[name="address"]')
      .should('exist')
      .should('have.value', client_data.address)

    // Verifica que el botón "Limpiar" esté presente
    cy.contains('Limpiar').should('exist')

    // Verifica que el botón "Guardar cliente" esté presente
    cy.contains('Guardar cliente').should('exist')
  })
  it('save client just with name', () => {
    cy.mount(
      <ClientForm
        setClient={(client) => {
          alert(client?.name)
        }}
      />
    )
    // disabled if name is empty
    cy.get('button[test-id="save-client"]').should('be.disabled')
    // enabled when name is not empty
    cy.get('input[name="name"]').type(client_data.name)
    cy.get('button[test-id="save-client"]').should('be.enabled').click()
    // should display name
    const alertShown = cy.stub().as('alertShown')
    cy.on('window:alert', alertShown)
    //cy.contains('button', 'Guardar cliente').click()
    cy.get('@alertShown').should('have.been.calledOnceWith', client_data.name)
  })
})
