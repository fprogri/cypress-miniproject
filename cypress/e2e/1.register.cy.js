import LoginPage from "../support/page_objects/loginPage";
import RegisterPage from "../support/page_objects/registerPage";
import userData from "../fixtures/userData.json"; // imports the user data needet for registration
import RegisterResultPage from "../support/page_objects/registerResultPage";
import Header from "../support/page_objects/header";
userData.email = Math.floor(Math.random() * 9999999) + "@example.com"; // Generate a unique email for each registration
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const registrationResultPage = new RegisterResultPage();
const header = new Header();

describe("register", () => {
  // After all tests in this block, write the updated user data back to the JSON file so that it can be used by other tests
  after(() => {
    cy.writeFile("cypress/fixtures/userData.json", userData);
  });

  it("register", () => {
    cy.intercept("register?returnurl=%2F").as("registerRequest");
    cy.visit(""); // Visit the base URL (found in cypress.config file)

    // Perform the registration steps
    header.loginLink(); // Click the login link in the header
    loginPage.registerButtonClick(); // Click the register button on the login page
    registerPage.newRegistration(userData); // Fill out and submit the registration form usig the provided object

    // Verify the registration was successful
    registrationResultPage.registrationSuccessCheck();

    // Wait for and check the intercepted registration request
    cy.wait("@registerRequest").then((interception) => {
      expect(interception.response.statusCode).to.eq(302); // Verify the response status code is 302 (chagenged it from 200)
    });

    header.logoutLink(); // Click the logout link in the header
  });
});
