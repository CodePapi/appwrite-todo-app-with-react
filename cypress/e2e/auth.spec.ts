describe('Auth flows', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');
  });

  it('navigates between login and signup', () => {
    cy.visit('/login');
    cy.contains('Welcome Back').should('be.visible');

    cy.contains('Create account').click();
    cy.contains('Create Account').should('be.visible');

    cy.visit('/signup');
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

    cy.visit('/login');

    cy.get('input[placeholder="you@example.com"]').type('cypress@example.com');
    cy.get('input[placeholder="••••••••"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.wait('@createSession');
    cy.wait('@getAccount');

    cy.url().should('include', '/todos');
    cy.contains('Welcome back, Cypress User').should('be.visible');
  });
});
