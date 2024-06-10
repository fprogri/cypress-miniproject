import Header from "./header";
const header = new Header();

class HomePage {
  elements = {
    logInLink: () => cy.get(".ico-login"),
    computerSublist: () => cy.get(".notmobile > :nth-child(1) > .sublist"),
    notebooksLink: () =>
      cy.get(".notmobile > :nth-child(1) > .sublist > :nth-child(2) > a"),
  };

  // Click on the login link on the header
  clickLogin() {
    this.elements.logInLink().click();
  }

  // Check if the user is logged in
  isLogedIn() {
    cy.contains("Welcome to our store").should("be.visible");
    header.elements.logoutLink().should("be.visible");
  }

  // Navigate to the notebooks page
  goToNotebooksPage() {
    this.elements.computerSublist().invoke("show"); // Show the computer sublist (hover)
    this.elements.notebooksLink().click();
    cy.url().should("contain", "notebooks");
  }
}

export default HomePage;
