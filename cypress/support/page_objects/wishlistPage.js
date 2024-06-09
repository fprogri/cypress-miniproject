class WishlistPage {
  elements = { table: () => cy.get("table") };
  vist() {
    cy.visit("wishlist");
  }
}
export default WishlistPage;
