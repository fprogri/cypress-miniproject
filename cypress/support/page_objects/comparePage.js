class ComparePage {
  elements = { table: () => cy.get("table") };

  vist() {
    cy.visit("compareproducts");
  }

  // checks if a product with this name is on the compare list
  foundProduct(productName) {
    this.elements.table().should("contain", productName);
  }
}
export default ComparePage;
