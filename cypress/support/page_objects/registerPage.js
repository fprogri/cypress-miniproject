class RegisterPage {
  elements = {
    title: () => cy.get("h1"),
    url: () => cy.url(),
    maleRadioButton: () => cy.get("#gender-male"),
    firstNameInput: () => cy.get("#FirstName"),
    lastNameInput: () => cy.get("#LastName"),
    dateSelect: () => cy.get('[name="DateOfBirthDay"]'),
    monthSelect: () => cy.get('[name="DateOfBirthMonth"]'),
    yearSelect: () => cy.get('[name="DateOfBirthYear"]'),
    emailInput: () => cy.get("#Email"),
    companyInput: () => cy.get("#Company"),
    passwordInput: () => cy.get("#Password"),
    confirmPasswordInput: () => cy.get("#ConfirmPassword"),
    registerButton: () => cy.get("#register-button"),
  };

  newRegistration(object) {
    this.elements.url().should("contain", "register");
    this.elements.title().should("contain", "Register");
    this.elements.maleRadioButton().click();
    this.elements.firstNameInput().type(object.name);
    this.elements.lastNameInput().type(object.surname);
    this.elements.dateSelect().select(object.date);
    this.elements.monthSelect().select(object.month);
    this.elements.yearSelect().select(object.year);
    this.elements.emailInput().type(object.email);
    this.elements.companyInput().type(object.company);
    this.elements.passwordInput().type(object.pw);
    this.elements.confirmPasswordInput().type(object.pw);
    this.elements.registerButton().click();
  }
}

export default RegisterPage;
