describe('Augment Tours Register Museum', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/');
      cy.viewport(1280, 720);
      cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
      cy.get('[augment-input="password"]').type('123456');
      cy.get('[augment-input="login-button"]').click();
      cy.wait(1000);
    });

    it('TS_005_001 check "Add AR Models" functionality with valid fields', () => {
        cy.get('[augment-nav="museum"]').click();
        
    });

});