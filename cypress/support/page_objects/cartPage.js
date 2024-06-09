import Header from "./header";
const header = new Header();

class CartPage {
  elements = {
    buttons: {
      continueShopping: () => cy.get(".continue-shopping-button"),
      estimateShipping: () => cy.get("#open-estimate-shipping-popup"),
      remove: () => cy.get(".remove-btn"),
      apply: () => cy.get(".apply-shipping-button-container > .button-2"),
      closePopup: () => cy.get(".mfp-close"),
    },
    productSubtotal: () => cy.get(".product-subtotal"),
    productTotal: () => cy.get(".value-summary > strong"),
    estimateShippingPopup: () => cy.get("#estimate-shipping-popup"),
    countrySelect: () => cy.get("#CountryId"),
    stateSelect: () => cy.get("#StateProvinceId"),
    zipInput: () => cy.get("#ZipPostalCode"),
    emptyMessage: () => cy.get(".no-data"),
  };

  isEmpty() {
    this.elements.buttons.remove().should("not.exist");
    this.elements
      .emptyMessage()
      .should("be.visible")
      .and("contain", "Your Shopping Cart is empty!");
  }

  assertButtons() {
    this.elements.buttons.continueShopping().should("be.visible");
    this.elements.buttons.estimateShipping().should("be.visible");
  }

  assertTotal() {
    this.elements.productSubtotal().then(($subtotals) => {
      // Convert the text values to numbers and sum them
      const subtotalSum = Cypress._.sum(
        Cypress._.map($subtotals, (subtotal) => {
          // Remove currency symbols and commas, then convert to a number
          return parseFloat(subtotal.innerText.replace(/[\$,]/g, ""));
        })
      );

      // Step 2: Get the value of the .product-total element
      this.elements.productTotal().then(($total) => {
        // Remove currency symbols and commas, then convert to a number
        const total = parseFloat($total.text().replace(/[\$,]/g, ""));

        // Step 3: Assert that the sum of the subtotals is equal to the total
        expect(subtotalSum).to.equal(total);
      });
    });
    this.elements
      .productTotal()
      .should("have.css", "color", "rgb(74, 178, 241)");
  }

  visit() {
    cy.visit("cart");
    header.waitLoad();
    header.pageLoad();
  }

  estimateShipping(country = 1, state = 1, zip = 1) {
    this.elements.buttons.estimateShipping().click();
    this.elements.estimateShippingPopup().should("be.visible");
    this.elements.countrySelect().select(country);
    this.elements.stateSelect().select(state);
    this.elements.zipInput().type(zip);
    this.elements.buttons.apply().click();
    cy.intercept(
      `cart/estimateshipping?CountryId=${country}&StateProvinceId=${state}&ZipPostalCode=${zip}&City=`
    ).as("estimatedshipping");
    cy.wait("@estimatedshipping");
    this.elements.buttons.closePopup().click();
  }

  removeItem(nr) {
    cy.intercept(
      "/shoppingcart/checkoutattributechange/%7BisEditable%7D?isEditable=True"
    ).as("pageload");
    this.elements.buttons.remove().then(($elements) => {
      const initialCount = $elements.length;
      cy.wrap($elements).eq(nr).click();
      cy.wait("@pageload");
      this.elements.buttons.remove().should("have.length", initialCount - 1);
    });
  }
}
export default CartPage;
