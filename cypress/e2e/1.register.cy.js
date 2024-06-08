import HomePage from "../support/page_objects/homePage";
import LoginPage from "../support/page_objects/loginPage";
import RegisterPage from "../support/page_objects/registerPage";
import userData from "../fixtures/userData.json";
import RegisterResultPage from "../support/page_objects/registerResultPage";
import Header from "../support/page_objects/header";
userData.email = Math.floor(Math.random() * 9999999) + "@example.com";
const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const registrationResultPage = new RegisterResultPage();
const header = new Header();

describe("register", () => {
  after(() => {
    cy.writeFile("cypress/fixtures/userData.json", userData);
  });

  it("register", () => {
    cy.intercept("register?returnurl=%2F").as("registerRequest");
    cy.visit("");
    header.loginLink();
    loginPage.registerButtonClick();
    registerPage.newRegistration(userData);
    registrationResultPage.registrationSuccessCheck();
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(302);
    });
    header.logoutLink();
  });
});
