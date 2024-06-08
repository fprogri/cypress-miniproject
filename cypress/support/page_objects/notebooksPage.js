import ProductPage from "./productPage";
import Header from "./header";
const productPage = new ProductPage();
const header = new Header();

class NotebooksPage {
  elements = {
    pageSize: () => cy.get("#products-pagesize"),
    gb16: () => cy.get("#attribute-option-10"),
    productItem: () => cy.get(".product-item"),
    wishlistButton: () => cy.get('[title="Add to wishlist"]'),
    productTitle: () => cy.get(".product-title > a"),
    addToCartButton: () => cy.get(".product-box-add-to-cart-button"),
  };

  visit() {
    cy.intercept("/cdn-cgi/rum?").as("loads");
    const url = "notebooks";
    cy.visit(url);
    cy.url().should("contain", url);
    cy.wait("@loads");
    cy.wait("@loads");
  }

  pageSize(value) {
    this.elements.pageSize().select(value);
  }

  itemsOnPage(a) {
    this.elements.productItem().should("have.length", a);
  }

  check16gb() {
    this.elements.gb16().click();
  }

  openDetails(nr) {
    this.elements.productTitle().eq(nr).click();
    productPage.elements
      .productSpecs()
      .should("be.visible")
      .and("contain", "Products specifications");
  }

  addToWishlist(nr) {
    this.elements.wishlistButton().eq(nr).click();
    header.elements
      .notification()
      .should("be.visible")
      .and("contain", "The product has been added to your wishlist");
    header.elements.closeButton().click();
  }

  addToCart(nr) {
    this.elements.addToCartButton().eq(nr).click();
    header.elements
      .notification()
      .should("be.visible")
      .and("contain", "The product has been added to your shopping cart");
    header.elements.closeButton().click();
  }
}

export default NotebooksPage;
