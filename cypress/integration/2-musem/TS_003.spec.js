describe('Augment Tours Register Museum', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001/');
      cy.viewport(1280, 720);
      cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
      cy.get('[augment-input="password"]').type('123456');
      cy.get('[augment-input="login-button"]').click();
      cy.wait(1000);
    });


    it('TS_003_001 check register with all valid inputs', () => {
        cy.get('[augment-nav="museum"]').click();
        cy.get('[augment-button="new-museum"]').click();
        cy.get('[augment-input="museum-name"]').type('Museum Name');
        cy.get('[augment-input="museum-description"]').type('Museum Description');
        cy.get('[augment-input="museum-image-url"]').type('http://www.museum.com/image.jpg');
        cy.get('[augment-button="create-museum"]').click();
        cy.get('[augment-button="new-museum"]').should('be.visible');
    });

    it('TS_003_002 check register with invalid image', () => {
        cy.get('[augment-nav="museum"]').click();
        cy.get('[augment-button="new-museum"]').click();
        cy.get('[augment-input="museum-name"]').type('Museum Name');
        cy.get('[augment-input="museum-description"]').type('Museum Description');
        cy.get('[augment-input="museum-image-url"]').type('invalid');
        cy.get('[augment-text="museumerror"]').should('contain.text', 'invalid image error');
    });

    it('TS_003_003 check register with empty name or image', () => {
        cy.get('[augment-nav="museum"]').click();
        cy.get('[augment-button="new-museum"]').click();
        cy.get('[augment-input="museum-name"]').type('Museum Name');
        cy.get('[augment-input="museum-description"]').type('Museum Description');
        cy.get('[augment-text="museumerror"]').should('contain.text', 'fill all required fields');
    });

});