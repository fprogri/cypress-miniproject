import Header from "./header";
const header = new Header();

class HomePage {
  elements = {
    logInLink: () => cy.get(".ico-login"),
    computerSublist: () => cy.get(".notmobile > :nth-child(1) > .sublist"),
    notebooksLink: () =>
      cy.get(".notmobile > :nth-child(1) > .sublist > :nth-child(2) > a"),
  };

  clickLogin() {
    this.elements.logInLink().click();
  }
  isLogedIn() {
    cy.contains("Welcome to our store").should("be.visible");
    header.elements.logoutLink().should("be.visible");
  }
  goToNotebooksPage() {
    this.elements.computerSublist().invoke("show");
    this.elements.notebooksLink().click();
    cy.url().should("contain", "notebooks");
  }
}

export default HomePage;
