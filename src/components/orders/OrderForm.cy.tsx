import React from 'react'
import OrderForm from './OrderForm'
import ModalOrderForm from './ModalOrderForm'

describe('<OrderForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ModalOrderForm label="Nueva orden" shippingEnabled={true} />)
    cy.contains('Nueva orden').click()

    //* 1. CLIENT form
    cy.contains('1. Cliente').click()
    cy.get('button[test-id="save-client"]').should('be.disabled')
    cy.get('input[name="name"]').type('test name')
    cy.get('button[test-id="save-client"]').should('be.enabled').click()
    //* Client data is ok
    cy.contains('Nueva orden')
    cy.contains('Nombre: test name')

    //* 2. SHIPPING form should be enabled
    cy.contains('2. Entrega').click()
    cy.contains('Detalles de entrega')
    cy.get('button[test-id="assign-shipping"]').contains('Asignar')
    cy.get('[test-id="shipping-in-store"] input').should('be.checked')
    cy.get('[test-id="shipping-now"] input').should('be.checked')
    cy.get('[test-id="shipping-free-cost"] input').should('be.checked')
    cy.get('button[test-id="save-shipping"]').should('be.enabled').click()
    //* Shipping data is ok
    cy.contains('Fecha: Ahora')
    cy.contains('Lugar: En tienda')
    cy.contains('Asignado: Sin asignar')
    cy.contains('Costo: $0.00')

    //* 3. SELECT ITEMS form should be enabled
    cy.contains('3. Seleccionar unidades').click()
  })
})
