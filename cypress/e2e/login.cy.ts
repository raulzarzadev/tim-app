import { contains } from 'cypress/types/jquery'

describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('[test-id="login-button"]').click()
    cy.get('[test-id="login-form"]').get('[test-id="link-sign-up"]').click()
    cy.get('[test-id="sign-up-form"]').get('[test-id="link-login"]').click()
    cy.get('[test-id="login-form"]').get('[test-id="link-forgot"]').click()
    cy.get('[ test-id="forgot-password-form"]')
      .get('[test-id="backwards-button"]')
      .click()
    cy.get('[test-id="login-form"]')
    //.get('[test-id="link-login"]').click()
  })
})
