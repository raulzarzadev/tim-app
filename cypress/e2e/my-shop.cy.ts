describe('my shop navigation', () => {
  const contractText = `test contract ${Math.random().toFixed(10)}`
  it('visit my shop', () => {
    cy.visit('http://localhost:3000')
    cy.login()
    cy.contains('Mi tienda').click()
    cy.get('[test-id="shop-view"]')

    //* User don´t have any shop

    cy.get('button[test-id="shop-settings"]').click()
    cy.contains('button', 'Editar').click()
    cy.get('[test-id="modal-Editar tienda"]').scrollTo('bottom') //.scrollIntoView({ duration: 200 })

    cy.contains('button', 'Editar empresa').should('be.disabled')
    cy.get('[test-id="modal-Editar tienda"]').scrollTo('bottom') //.scrollIntoView({ duration: 200 })
    cy.get('textarea[name="contract"]').clear()
    cy.get('textarea[name="contract"]').type(contractText)
    cy.get('textarea[name="contract"]').should('have.value', contractText)
    cy.contains('button', 'Editar empresa')
      .should('be.enabled')
      .click()
      .get('[test-id="modal-Confirmar"]')
      .contains('Se editara la siguiente empresa')
    cy.get('button[test-id="confirm-button"]').click()
    cy.get('button[test-id="confirm-button"]').should('be.disabled')

    //cy.visit('http://localhost:3000/my-shop')
  })
})
