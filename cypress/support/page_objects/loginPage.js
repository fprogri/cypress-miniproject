import Header from "./header";
const header = new Header();

class LoginPage {
  elements = {
    registerButton: () => cy.get(".new-wrapper > .buttons > .button-1"),
    emailInput: () => cy.get("#Email"),
    pwInput: () => cy.get("#Password"),
    loginButton: () => cy.get("form > .buttons > .button-1"),
  };

  // Click the register button
  registerButtonClick() {
    header.waitLoad();
    this.elements.registerButton().should("be.visible").click();
  }

  // Log in using provided credentials
  login(object) {
    this.elements.emailInput().type(object.email);
    this.elements.pwInput().type(object.pw);
    this.elements.loginButton().click();
  }
}

export default LoginPage;
