class CartPage {
  elements = {
    buttons: {
      continueShopping: () => cy.get(".continue-shopping-button"),
      estimateShipping: () => cy.get("#open-estimate-shipping-popup"),
    },
    productSubtotal: () => cy.get(".product-subtotal"),
    productTotal: () => cy.get(".value-summary > strong"),
  };

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
}
export default CartPage;
