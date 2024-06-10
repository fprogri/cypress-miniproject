class WishlistPage {
  elements = { table: () => cy.get("table") };

  vist() {
    cy.visit("wishlist");
  }

  // checks if a product with this name is on the wishlist table
  foundProduct(productName) {
    this.elements.table().should("contain", productName);
  }
}
export default WishlistPage;
