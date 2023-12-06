import React from 'react'
import TestOrderForm from '@/app/components/new-order/TestOrderForm'
import { CompanyType } from '@/types/company'

const testCompany: CompanyType = {
  id: 'test id',
  name: 'test name',
  description: 'test description',
  userId: '1',
  staffMails: ['test staffMails'],
  staff: [
    {
      name: 'test name',
      email: 'test email',
      id: 'test id',
      permissions: {
        ADMIN: true
      }
    }
  ],
  shippingEnabled: true,
  articles: [
    {
      id: '1',
      name: 'test name 1',
      category: 'test category',
      serialNumber: '1',
      status: 'active'
    },
    {
      id: '2',
      name: 'test name 2',
      category: 'test category',
      serialNumber: '2',
      status: 'active'
    }
  ],
  categories: [
    {
      name: 'test category',
      prices: [
        {
          unit: 'hour',
          price: 100,
          quantity: 1
        }
      ],
      description: 'category test description'
    }
  ],
  updated: {
    at: new Date(),
    by: 'test by',
    byEmail: 'test byEmail'
  },
  created: {
    at: new Date(),
    by: 'test by',
    byEmail: 'test byEmail'
  }
}
describe('make a simple order forms and should', () => {
  it('finish with out problems', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TestOrderForm company={testCompany} />)
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
    cy.contains('Datos de entrega')
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

    //* SHOW THE ALL FORM IN THE VIEW PORT
    cy.viewport(968, 1468)

    //* 3. SELECT ITEMS form should be enabled
    cy.contains('3. Seleccionar unidades').click()
    cy.get('[test-id="select-category"]').click()
    cy.contains(testCompany?.categories?.[0]?.name || '').click()
    cy.get(`[test-id="item-chip-${testCompany?.articles?.[0]?.id}"]`).click()
    cy.get(`[test-id="selected-item-chip-${testCompany?.articles?.[0]?.id}"]`)
    cy.get('[test-id="save-selected-items"]').should('be.enabled').click()

    //* selected items should be ok
    cy.get(`[test-id="selected-item-row-${testCompany?.articles?.[0]?.id}"]`)
    // //* select item price, row should show the correct price
    cy.get('[test-id="select-item-price-0"]').click()
    cy.get('[test-id="item-total"]').contains('$100.00')

    // //* Payment
    cy.contains('button', 'Pagar $100.00')
      .click()
      .get('[test-id="confirm-payment"]')
      .should('be.disabled')

    cy.get('input[name="amount"]').type('100')
    cy.get('[test-id="confirm-payment"]').should('be.enabled').click()

    cy.get('[test-id="modal-Confirmar pago"]')
      .contains('button', 'Aceptar')
      .click()

    //* Payment done ok
    //  cy.contains('button', 'Pagar $0.00')

    //cy.contains('button', 'Guardar').should('be.disabled')
    // cy.contains('Guardando')

    // cy.contains('Pagar')
    // cy.contains('Total: $100.00')
    // cy.get('button[test-id="confirm-payment"]').should('be.disabled')
  })
})
