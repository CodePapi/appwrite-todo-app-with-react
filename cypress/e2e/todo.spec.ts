describe('Todo page interactions', () => {
  beforeEach(() => {
    cy.fixture('user').as('userData');

    // stub account.get to return user
    cy.intercept('GET', '**/v1/account', { fixture: 'user.json' }).as(
      'getAccount',
    );

    // initial listDocuments returns empty
    cy.intercept('GET', '**/v1/databases/**/collections/**/documents', {
      statusCode: 200,
      body: { documents: [] },
    }).as('listDocumentsEmpty');
  });

  it('shows empty state and adds a new todo', () => {
    cy.visit('/todos', {
      onBeforeLoad(win) {
        // @ts-expect-error allow assigning for debugging
        win.onerror = function (msg) {
          // eslint-disable-next-line no-console
          console.error('window.onerror:', msg);
        };
      },
    });

    cy.wait('@getAccount');
    cy.wait('@listDocumentsEmpty');

    cy.contains('No tasks yet. Start by adding one above!').should(
      'be.visible',
    );

    // stub createDocument to succeed
    cy.intercept(
      'POST',
      '**/v1/databases/**/collections/**/documents',
      (req) => {
        req.reply({
          statusCode: 201,
          body: {
            $id: 'todo_1',
            content: 'New Cypress Task',
            parentId: null,
            isCompleted: false,
            userId: 'user_123',
          },
        });
      },
    ).as('createDocument');

    // After creating, listDocuments should return the created document
    cy.intercept('GET', '**/v1/databases/**/collections/**/documents', {
      statusCode: 200,
      body: {
        documents: [
          {
            $id: 'todo_1',
            content: 'New Cypress Task',
            parentId: null,
            isCompleted: false,
            userId: 'user_123',
          },
        ],
      },
    }).as('listDocumentsWithOne');

    cy.get('input[placeholder="What needs to be done?"]').type(
      'New Cypress Task',
    );
    cy.get('button').contains('Plus').should('not.exist');
    // click the submit button (the + icon button has no text, so select by type and position)
    cy.get('form').within(() => {
      cy.get('button[type="submit"]').click();
    });

    cy.wait('@createDocument');
    cy.wait('@listDocumentsWithOne');

    cy.contains('New Cypress Task').should('be.visible');
  });
});
describe('App basic navigation', () => {
  it('shows login and navigates to signup', () => {
    cy.visit('/login', {
      onBeforeLoad(win) {
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
  });
});
