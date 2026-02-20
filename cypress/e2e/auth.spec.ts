describe('Auth flows', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');

    // ensure crucial Appwrite endpoints are stubbed before page load
    cy.intercept('GET', '**/v1/account', { fixture: 'user.json' }).as('getAccount');
    cy.intercept({ method: 'POST', url: /.*\/v1\/.*account.*/i }, { statusCode: 201, body: {} }).as('createUser');
    cy.intercept({ method: 'POST', url: /.*\/v1\/.*sessions.*/i }, { statusCode: 201, body: {} }).as('createSession');
  });

  it('navigates between login and signup', () => {
    cy.visit('/login', {
      onBeforeLoad(win) {
        // surface runtime errors to Cypress runner
        // @ts-expect-error allow assigning for debugging
        win.onerror = function (msg) {
          // eslint-disable-next-line no-console
          console.error('window.onerror:', msg);
        };
      },
    });
    cy.contains('Welcome Back').should('be.visible');

    cy.contains('Create account').click();
    cy.contains('Create Account').should('be.visible');

    cy.visit('/signup', {
      onBeforeLoad(win) {
        // @ts-expect-error allow assigning for debugging
        win.onerror = function (msg) {
          // eslint-disable-next-line no-console
          console.error('window.onerror:', msg);
        };
      },
    });
    cy.contains('Create Account').should('be.visible');
    cy.contains('Log in').click();
    cy.contains('Welcome Back').should('be.visible');
  });

  it('signs up and redirects to todos', () => {
    // stub user registration and subsequent calls
    // match account creation broadly
    cy.intercept(
      { method: 'POST', url: /.*\/v1\/.*account.*/i },
      { statusCode: 201, body: {} },
    ).as('createUser');
    // match any session creation POST (covers /v1/account/sessions and subpaths)
    cy.intercept(
      { method: 'POST', url: /.*\/v1\/.*sessions.*/i },
      { statusCode: 201, body: {} },
    ).as('createSession');
    cy.intercept(
      { method: 'GET', url: /.*\/v1\/.*account.*/i },
      { fixture: 'user.json' },
    ).as('getAccount');

    cy.visit('/signup');

    cy.get('input[placeholder="John Doe"]').type('Cypress User');
    cy.get('input[placeholder="you@example.com"]').type('cypress@example.com');
    cy.get('input[placeholder="••••••••"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.wait('@createUser');
    cy.wait('@createSession');
    cy.wait('@getAccount');

    cy.url().should('include', '/todos');
    cy.contains('Welcome back, Cypress User').should('be.visible');
  });

  it('logs in and redirects to todos', () => {
    cy.intercept(
      { method: 'POST', url: /.*\/v1\/.*sessions.*/i },
      { statusCode: 201, body: {} },
    ).as('createSession');
    cy.intercept(
      { method: 'GET', url: /.*\/v1\/.*account.*/i },
      { fixture: 'user.json' },
    ).as('getAccount');

    cy.visit('/login', {
      onBeforeLoad(win) {
        // @ts-expect-error allow assigning for debugging
        win.onerror = function (msg) {
          // eslint-disable-next-line no-console
          console.error('window.onerror:', msg);
        };
      },
    });

    cy.get('input[placeholder="you@example.com"]').type('cypress@example.com');
    cy.get('input[placeholder="••••••••"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.wait('@createSession');
    cy.wait('@getAccount');

    cy.url().should('include', '/todos');
    cy.contains('Welcome back, Cypress User').should('be.visible');
  });
});
