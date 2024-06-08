import Header from "./header";
const header = new Header();

class ProductPage {
  elements = {
    productSpecs: () => cy.get(".product-specs-box > .title > strong"),
    addToCartButton: () => cy.get("#add-to-cart-button-7"),
    shippingAdress: () => cy.get("#open-estimate-shipping-popup-7 > span"),
  };

  addToCart() {
    this.elements.shippingAdress().should("be.visible");
    this.elements.addToCartButton().click();
    header.elements
      .notification()
      .should("contain", "The product has been added to your shopping cart");
  }
}
export default ProductPage;
