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
    grid: () => cy.get(".item-grid"),
  };

  // Visit the notebooks page
  visit() {
    const url = "notebooks";
    cy.visit(url);
    cy.url().should("contain", url);
    header.waitLoad();
  }

  // Change the number of products displayed per page
  pageSize(value) {
    this.elements.pageSize().select(value);
  }

  // Verify the number of items displayed on the page
  itemsOnPage(a) {
    this.elements.productItem().should("have.length", a);
  }

  // Filter products by 16GB option
  check16gb() {
    this.elements.gb16().click();
  }

  // Open the product details page
  openDetails(nr) {
    this.elements.productTitle().eq(nr).click();
    productPage.elements
      .productSpecs()
      .should("be.visible")
      .and("contain", "Products specifications");
  }

  // Add a product to the wishlist
  addToWishlist(nr) {
    this.elements.wishlistButton().eq(nr).click();
    // Verify the notification is visible and contains the expected message
    header.elements
      .notification()
      .should("be.visible")
      .and("contain", "The product has been added to your wishlist");
    header.elements.closeButton().click();
  }

  // Add a product to the shopping cart
  addToCart(nr) {
    this.elements.addToCartButton().eq(nr).click();
    // Verify the notification is visible and contains the expected message
    header.elements
      .notification()
      .should("be.visible")
      .and("contain", "The product has been added to your shopping cart");
    header.elements.closeButton().click();
  }
}

export default NotebooksPage;
