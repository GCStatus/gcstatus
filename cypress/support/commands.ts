const apiUrl = Cypress.env('API_URL')

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: `${apiUrl}/auth/login`,
    body: { email, password },
  }).then((resp) => resp.body.data.message)
})
