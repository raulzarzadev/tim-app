describe('Login flow ', () => {
  const userMail = Cypress.env('SHOP_USER_EMAIL') || ''
  const userPassword = Cypress.env('SHOP_USER_PASSWORD') || ''

  it('login with wrong credentials', () => {
    //* Login with wrong credentials
    cy.visit('localhost:3000/login')
    cy.get('[test-id="login-form"]').should('be.visible')
    cy.get('input[name="email"]').type(userMail)
    cy.get('input[name="password"]').type(`${userPassword}{enter}`)
    cy.contains('Credenciales incorrectas')

    //* Visit create account page
    cy.contains('¿No tienes cuenta? Registrate').click()
    cy.url().should('include', '/signup')

    //cy.visit('localhost:3000/signup')
    //cy.get('[test-id="sign-up-form"]').should('be.visible')
  })

  // it('sign up ', () => {
  //   //cy.visit('localhost:3000/signup')
  //   // cy.get('[test-id="login-form"]').should('be.visible')
  //   // cy.get('input[name="email"]').type(userMail)
  //   // cy.get('input[name="password"]').type(`${userPassword}{enter}`)
  //   // cy.contains('Credenciales incorrectas')
  // })

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
