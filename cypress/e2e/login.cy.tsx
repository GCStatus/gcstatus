// TODO: Change when implemented.

describe('Login Page', () => {
  it('should load the login page and submit form', () => {
    cy.visit('/login')

    cy.get('input[placeholder="Type your nickname or email..."]').type(
      'test@example.com',
    )
    cy.get('input[placeholder="Type your password..."]').type('password')

    cy.get('button').contains('Login').click()

    cy.log('Form submitted')
  })

  it('should trigger social logins', () => {
    cy.visit('/login')

    cy.get('button').contains('Google').click()
    cy.get('button').contains('Facebook').click()
    cy.get('button').contains('Twitter').click()
  })
})
