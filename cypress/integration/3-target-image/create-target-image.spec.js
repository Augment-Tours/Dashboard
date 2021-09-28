describe('Augment Tours Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
    cy.viewport(1280, 720);
    cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
    cy.get('[augment-input="password"]').type('123456');
    cy.get('[augment-input="login-button"]').click();
    cy.wait(1000);
  });

  it('correct username and password should display the dashboard', () => {
    cy.get('[augment-nav="target-image"]').click();
    cy.get('[augment-button="new-target-image"]').click();
    cy.get('[augment-input="info"]').type('target info');
    cy.get('[augment-input="target-url"]').type('model.png');
    cy.get('[augment-input="target-x-loc"]').type('target info');
    cy.get('[augment-input="target-y-loc"]').type('target info');
    cy.get('[augment-input="target-floor"]').type('target info');
    cy.get('[augment-input="target-type"]').click();
    // 
    cy.get('[augment-input="target-type-museum"]').click();
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5 Killo"]').click();

    cy.get('[augment-button="create-target-image"]').click();
    cy.wait(1000);
    cy.get('[augment-button="new-armodel"]').should('be.visible');
  });
});
