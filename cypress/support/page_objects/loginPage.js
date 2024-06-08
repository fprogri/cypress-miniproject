class LoginPage {
  elements = {
    registerButton: () => cy.get(".new-wrapper > .buttons > .button-1"),
    emailInput: () => cy.get("#Email"),
    pwInput: () => cy.get("#Password"),
    loginButton: () => cy.get("form > .buttons > .button-1"),
  };

  registerButtonClick() {
    this.elements.registerButton().should("be.visible").click();
  }
  login(object) {
    this.elements.emailInput().type(object.email);
    this.elements.pwInput().type(object.pw);
    this.elements.loginButton().click();
  }
}

export default LoginPage;
