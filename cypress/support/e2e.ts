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
  cy.intercept('GET', '**/v1/databases/**/collections/**/documents', {
    statusCode: 200,
    body: { documents: [] },
  }).as('stubListDocuments');
});

// Forward browser console messages into Cypress log to help debugging
Cypress.on('window:before:load', (win) => {
  const methods = ['error', 'warn', 'info', 'log'] as const;
  for (const m of methods) {
    const orig = win.console[m] as unknown as (...args: unknown[]) => unknown;
    const consoleRecord = win.console as unknown as Record<
      string,
      (...args: unknown[]) => unknown
    >;
    consoleRecord[m] = function (...args: unknown[]) {
      // forward to the real console so output appears in Cypress logs
      // eslint-disable-next-line no-console
      // @ts-expect-error - console index signature for these keys is acceptable
      console[m](...(args as unknown[] as []));
      try {
        // attach to cy task log if available (no-op otherwise)
        // @ts-expect-error - Cypress may expose `cy` in the browser context during tests
      } catch (e) {
        // ignore
      }
      return orig.apply(this, args);
    };
  }
});
