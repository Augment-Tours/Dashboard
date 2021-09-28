describe('Augment Tours Register Museum', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/');
    cy.viewport(1280, 720);
    cy.get('[augment-input="username"]').type('aman.teferi.80@gmail.com');
    cy.get('[augment-input="password"]').type('123456');
    cy.get('[augment-input="login-button"]').click();
    cy.wait(4000);
  });

  it('TS_005_001 check "Add AR Models" functionality with valid fields', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-list="armodel"]').should(($list) => {
      expect($list).to.have.length(4);
    })
  //  expect(cy.get('[augment-list="armodel"]').find('tr')).to.have.lengthOf(5)
  //   cy.get('[augment-list="armodel"]')
  //   expect(cy.get('[augment-list="armodel"]').find('tr').to.have.lengthOf(5))
  });

  it('TS_005_002 check "Add AR Models" functionality with invalid name credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelName is a required field');

  });

   it('TS_005_003 check "Add AR Models" functionality with invalid description credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelDescription is a required field');
   });

  it('TS_005_004 check "Add AR Models" functionality with invalid model url credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('invalid');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelUrl must be a valid URL');

  });

  it('TS_005_005 check "Add AR Models" functionality with invalid x location credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelXLocation is a required field');

  });

  it('TS_005_006 check "Add AR Models" functionality with invalid y location credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelYLocation is a required field');

  });
  
  it('TS_005_007 check "Add AR Models" functionality with invalid floor credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('AR Model Name');
    cy.get('[augment-input="armodel-description"]').type('AR Model Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-input="museum"]').click();
    cy.get('[augment-input="5kilo "]').click();
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('');
    cy.get('[augment-input="armodel-image"]').type('http://www.armodel.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelFloor must be a number type');

  });
  
  it('TS_005_008 check "Add AR Models" functionality with invalid museumid credentials', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-input="armodel-name"]').type('Museum Name');
    cy.get('[augment-input="armodel-description"]').type('Museum Description');
    cy.get('[augment-input="armodel-url"]').type('http://www.museum.com/image.jpg');
    cy.get('[augment-input="armodel-xlocation"]').type('0');
    cy.get('[augment-input="armodel-ylocation"]').type('0');
    cy.get('[augment-input="armodel-zlocation"]').type('0');
    cy.get('[augment-input="armodel-xscale"]').type('0');
    cy.get('[augment-input="armodel-yscale"]').type('0');
    cy.get('[augment-input="armodel-zscale"]').type('0');
    cy.get('[augment-input="armodel-floor"]').type('1');
    cy.get('[augment-input="armodel-image"]').type('http://www.museum.com/image.jpg');
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'museumId is a required field');

  });
  
  it('TS_005_009 check "Add AR Models" functionality with empty fields', () => {
    cy.get('[augment-nav="ar-model"]').click();
    cy.get('[augment-button="new-armodel"]').click();
    cy.get('[augment-button="create-armodel"]').click();
    cy.wait(1000);
    cy.get('[augment-text="armodelerror"]').should('contain.text', 'modelName is a required field');

  });
});