import HomePage from "../support/page_objects/homePage";
import LoginPage from "../support/page_objects/loginPage";
import RegisterPage from "../support/page_objects/registerPage";
import RegisterResultPage from "../support/page_objects/registerResultPage";
import Header from "../support/page_objects/header";
const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const registrationResultPage = new RegisterResultPage();
const header = new Header();
import userData from "../fixtures/userData.json";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
Cypress.Commands.add("login", (object) => {
  cy.session(
    object.email,
    () => {
      cy.visit("login");
      loginPage.login(object);
      homePage.isLogedIn();
    },
    { cacheAcrossSpecs: true }
  );
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
