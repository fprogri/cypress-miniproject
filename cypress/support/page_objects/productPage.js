import Header from "./header";
const header = new Header();

class ProductPage {
  elements = {
    productSpecs: () => cy.get(".product-specs-box > .title > strong"),
    addToCartButton: () => cy.get("#add-to-cart-button-7"),
    shippingAdress: () => cy.get("#open-estimate-shipping-popup-7 > span"),
    productId: () => cy.get("[data-productid]"),
    token: () => cy.get('input[name="__RequestVerificationToken"]'),
  };

  addToCart() {
    this.elements.shippingAdress().should("be.visible");
    this.elements.addToCartButton().click();
    header.elements
      .notification()
      .should("contain", "The product has been added to your shopping cart");
  }

  compareItem() {
    this.elements.productId().then(($el) => {
      const productId = $el.attr("data-productid");

      this.elements.token().then(($input) => {
        const token = $input.val();

        cy.request({
          method: "POST",
          url: `/compareproducts/add/${productId}`,
          form: true,
          body: { __RequestVerificationToken: token },
        }).then((response) => {
          expect(response.status).to.eq(200);
          cy.log("Product Data:", response.body);
        });
      });
    });
  }
}

export default ProductPage;
