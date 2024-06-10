import Header from "./header";
const header = new Header();

class ProductPage {
  elements = {
    productSpecs: () => cy.get(".product-specs-box > .title > strong"),
    addToCartButton: () => cy.get("#add-to-cart-button-7"),
    shippingAdress: () => cy.get("#open-estimate-shipping-popup-7 > span"),
    productId: () => cy.get("[data-productid]"),
    token: () => cy.get('input[name="__RequestVerificationToken"]'),
    title: () => cy.get("h1"),
  };

  // Add the product to the shopping cart
  addToCart() {
    this.elements.shippingAdress().should("be.visible"); // makes sure the page is loaded
    this.elements.addToCartButton().click();
    // Verify the notification message
    header.elements
      .notification()
      .should("contain", "The product has been added to your shopping cart");
  }

  // Add the product to the compare list using api request
  addToCompare(productName) {
    this.elements.productId().then(($el) => {
      const productId = $el.attr("data-productid"); // Get the product ID

      this.elements.token().then(($input) => {
        const token = $input.val(); // Get the CSRF token

        // Send a POST request to add the product to the compare list
        cy.request({
          method: "POST",
          url: `/compareproducts/add/${productId}`,
          form: true,
          body: { __RequestVerificationToken: token },
        }).then((response) => {
          expect(response.status).to.eq(200); // Check that the response status is 200
          cy.log("Product Data:", response.body); // Log the response body
        });
      });
    });
  }

  // Add the product to the wishlist
  addToWishlist(productName) {
    this.elements.productId().then(($el) => {
      const productId = $el.attr("data-productid"); // Get the product ID

      this.elements.token().then(($input) => {
        const token = $input.val(); // Get the CSRF token

        // Send a POST request to add the product to the wishlist
        cy.request({
          method: "POST",
          url: `addproducttocart/details/${productId}/2`,
          form: true,
          body: { __RequestVerificationToken: token },
        }).then((response) => {
          expect(response.status).to.eq(200); // Check that the response status is 200
          cy.log("Product Data:", response.body); // Log the response body
        });
      });
    });
  }
}

export default ProductPage;
