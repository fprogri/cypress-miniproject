class RegisterResultPage {
  elements = {
    resultMessage: () => cy.get(".result"),
  };

  // asserts that the registration was sucesful
  registrationSuccessCheck() {
    this.elements
      .resultMessage()
      .should("be.visible")
      .and("contain", "Your registration completed");
  }
}
export default RegisterResultPage;
