describe('App basic navigation', () => {
  it('shows login and navigates to signup', () => {
    cy.visit('/login')
    cy.contains('Welcome Back').should('be.visible')

    cy.contains('Create account').click()
    cy.contains('Create Account').should('be.visible')
  })
})
