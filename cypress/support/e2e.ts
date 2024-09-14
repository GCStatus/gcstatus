// ***********************************************************
// This example support/e2e.ts is processed and loaded automatically
// before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the 'supportFile'
// configuration option.
//
// More info: https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Set global configurations or behaviors here

// Example: Ignore uncaught exceptions that aren't relevant to the test
Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent Cypress from failing the test on uncaught exceptions
  // Example: Ignore errors caused by third-party libraries or ads
  console.log('Caught exception: ', err)

  // return false to prevent the test from failing
  return false
})
