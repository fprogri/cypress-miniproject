class RegisterResultPage {
  elements = {
    resultMessage: () => cy.get(".result"),
  };

  registrationSuccessCheck() {
    this.elements
      .resultMessage()
      .should("be.visible")
      .and("contain", "Your registration completed");
  }
}
export default RegisterResultPage;
