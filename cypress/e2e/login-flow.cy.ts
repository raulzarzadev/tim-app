describe('Login flow ', () => {
  const userMail = Cypress.env('CYPRESS_SHOP_TEST_USER_EMAIL') || ''
  const userPassword = Cypress.env('CYPRESS_SHOP_TEST_USER_PASSWORD') || ''
  it('login with wrong credentials', () => {
    cy.log('login with wrong credentials', userMail)
    cy.visit('localhost:3000/login')
    cy.get('[test-id="login-form"]').should('be.visible')
    cy.get('input[name="email"]').type(userMail)
  })

  // it('login, sing-up and forgot pages ', () => {
  //   // cy.visit('localhost:3000')
  //   // cy.get('[test-id="login-button"]').click()
  //   // cy.get('[test-id="login-form"]').get('[test-id="link-sign-up"]').click()
  //   // cy.get('[test-id="sign-up-form"]').get('[test-id="link-login"]').click()
  //   // cy.get('[test-id="login-form"]').get('[test-id="link-forgot"]').click()
  //   // cy.get('[ test-id="forgot-password-form"]')
  //   //   .get('[test-id="backwards-button"]')
  //   //   .click()
  //   // cy.get('[test-id="login-form"]')
  //   //.get('[test-id="link-login"]').click()
  // })
})
