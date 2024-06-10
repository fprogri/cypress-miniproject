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

  // check if the cart page is empty
  isEmpty() {
    this.elements.buttons.remove().should("not.exist");
    this.elements
      .emptyMessage()
      .should("be.visible")
      .and("contain", "Your Shopping Cart is empty!");
  }

  // Check if the continue shopping and estimate shipping buttons are visible
  assertButtons() {
    this.elements.buttons.continueShopping().should("be.visible");
    this.elements.buttons.estimateShipping().should("be.visible");
  }

  // Verify that the total price is correct
  assertTotal() {
    this.elements.productSubtotal().then(($subtotals) => {
      const subtotalSum = Cypress._.sum(
        // sums the prices of products and asigns them to a variable
        Cypress._.map($subtotals, (subtotal) => {
          //itterates through the found elements
          return parseFloat(subtotal.innerText.replace(/[\$,]/g, ""));
          // trims the inner text of each element and converts it to number
        })
      );

      // Get the total value
      this.elements.productTotal().then(($total) => {
        // Remove currency symbols and commas, then convert to a number
        const total = parseFloat($total.text().replace(/[\$,]/g, ""));
        expect(subtotalSum).to.equal(total);
      });
    });

    // Verify the color of the product total element
    this.elements
      .productTotal()
      .should("have.css", "color", "rgb(74, 178, 241)");
  }

  // Visit the cart page and makes sure that it is done loading
  visit() {
    cy.visit("cart");
    header.waitLoad();
    header.pageLoad();
  }

  // Estimate the shipping cost
  estimateShipping(country = 1, state = 1, zip = 1) {
    // opens the estimate shipping popup, fills the form and submits it
    this.elements.buttons.estimateShipping().click();
    this.elements.estimateShippingPopup().should("be.visible");
    this.elements.countrySelect().select(country);
    this.elements.stateSelect().select(state);
    this.elements.zipInput().type(zip);
    this.elements.buttons.apply().click();

    // checks that the correct request is sent
    cy.intercept(
      `cart/estimateshipping?CountryId=${country}&StateProvinceId=${state}&ZipPostalCode=${zip}&City=`
    ).as("estimatedshipping");
    cy.wait("@estimatedshipping");

    this.elements.buttons.closePopup().click();
  }

  // Remove an item from the cart
  removeItem(nr) {
    cy.intercept(
      "/shoppingcart/checkoutattributechange/%7BisEditable%7D?isEditable=True"
    ).as("pageload");
    this.elements.buttons.remove().then(($elements) => {
      const initialCount = $elements.length; // Get the initial number of remove buttons
      cy.wrap($elements).eq(nr).click(); // Click the remove button for the specified item
      cy.wait("@pageload"); // Wait for the page load request to complete
      this.elements.buttons.remove().should("have.length", initialCount - 1); // Ensure the number of remove buttons decreased by one
    });
  }
}

export default CartPage;
