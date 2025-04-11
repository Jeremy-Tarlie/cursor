describe('Chat Application', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should load the chat interface', () => {
    cy.get('h1').should('contain', 'Chat avec Fireworks AI');
    cy.get('textarea').should('have.attr', 'placeholder', 'Posez votre question ici...');
    cy.get('button').should('contain', 'Envoyer').and('be.disabled');
  });

  it('should enable submit button when text is entered', () => {
    cy.get('textarea').type('Test question');
    cy.get('button').should('not.be.disabled');
  });

  it('should handle successful message submission', () => {
    cy.intercept('POST', '/api/chat', {
      statusCode: 200,
      body: { response: 'Test response from API' },
    }).as('chatRequest');

    cy.get('textarea').type('Test question');
    cy.get('button').click();

    cy.get('button').should('contain', 'Chargement...');
    cy.wait('@chatRequest');
    cy.contains('Test response from API').should('be.visible');
  });

  it('should handle API error', () => {
    cy.intercept('POST', '/api/chat', {
      statusCode: 500,
      body: { error: 'Erreur de communication avec Fireworks AI' },
    }).as('chatRequest');

    cy.get('textarea').type('Test question');
    cy.get('button').click();

    cy.wait('@chatRequest');
    cy.contains('Erreur de communication avec Fireworks AI').should('be.visible');
  });

  it('should clear previous response when submitting new message', () => {
    // First message
    cy.intercept('POST', '/api/chat', {
      statusCode: 200,
      body: { response: 'First response' },
    }).as('firstRequest');

    cy.get('textarea').type('First question');
    cy.get('button').click();
    cy.wait('@firstRequest');
    cy.contains('First response').should('be.visible');

    // Second message
    cy.intercept('POST', '/api/chat', {
      statusCode: 200,
      body: { response: 'Second response' },
    }).as('secondRequest');

    cy.get('textarea').clear().type('Second question');
    cy.get('button').click();
    cy.wait('@secondRequest');

    cy.contains('First response').should('not.exist');
    cy.contains('Second response').should('be.visible');
  });
}); 