class ComparePage {
  elements = { table: () => cy.get("table") };
  vist() {
    cy.visit("compareproducts");
  }
}
export default ComparePage;
