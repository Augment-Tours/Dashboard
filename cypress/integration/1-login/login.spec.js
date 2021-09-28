describe('Augment Tours Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
  });
  it('correct username and password should display the dashboard', () => {
    cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
    cy.get('[augment-input="password"]').type('123456');
    cy.get('[augment-input="login-button"]').click();
    cy.wait(3000);
    cy.get('[augment-text="welcome"]').should('be.visible');
  });
  it('correct username and incorrect password should not display the dashboard', () => {
    cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
    cy.get('[augment-input="password"]').type('incorrect password');
    cy.get('[augment-input="login-button"]').click();
    cy.wait(1000);
    cy.get('[augment-text="error"]').should('contain.text', '* Invalid credentials');
  });
  it('incorrect username and correct password should not display the dashboard', () => {
    cy.get('[augment-input="username"]').type('incorrect@gmail.com');
    cy.get('[augment-input="password"]').type('123456');
    cy.get('[augment-input="login-button"]').click();
    cy.wait(1000);
    cy.get('[augment-text="error"]').should('contain.text', '* Invalid credentials');
  });
});
