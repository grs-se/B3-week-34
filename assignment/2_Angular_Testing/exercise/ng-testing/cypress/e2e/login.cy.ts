describe('Login Form', () => {
  it('logs in a user', () => {
    cy.visit('/login'); // Adjust URL as needed (e.g., if you serve login on '/')
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('input[name="password"]').type('123456');
    cy.contains('Login').click();
    cy.url().should('include', '/dashboard'); // Assert redirection to dashboard
  });
});