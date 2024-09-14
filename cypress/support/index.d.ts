declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in a user.
     *
     * @param email - The email of the user
     * @param password - The password of the user
     */
    login(email: string, password: string): Chainable<void>
  }
}
