/// <reference types="cypress" />

// Prevent tests from failing due to uncaught exceptions in the app
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

// Provide default stubs for Appwrite endpoints so the app can render
// quickly in CI / local runs. Individual specs can override these.
beforeEach(() => {
  // account.get -> return fixture user by default
  cy.intercept('GET', '**/v1/account', { fixture: 'user.json' }).as(
    'stubGetAccount',
  );

  // default list documents -> empty
  cy.intercept(
    'GET',
    '**/v1/databases/**/collections/**/documents',
    { statusCode: 200, body: { documents: [] } },
  ).as('stubListDocuments');
});

// Forward browser console messages into Cypress log to help debugging
Cypress.on('window:before:load', (win) => {
  const methods = ['error', 'warn', 'info', 'log'] as const;
  methods.forEach((m) => {
    const orig = win.console[m];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (win.console as any)[m] = function (...args: any[]) {
      // eslint-disable-next-line no-console
      console[m](...args);
      try {
        // attach to cy task log
        // @ts-expect-error - Cypress exposes cy in test context
        // no-op here; console output will still show in runner
      } catch (e) {
        // ignore
      }
      return orig.apply(this, args);
    };
  });
});
