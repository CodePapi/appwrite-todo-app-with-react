/// <reference types="cypress" />

// Prevent tests from failing due to uncaught exceptions in the app
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
