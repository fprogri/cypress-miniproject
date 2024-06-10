import HomePage from "../support/page_objects/homePage";
import LoginPage from "../support/page_objects/loginPage";
import userData from "../fixtures/userData.json"; // Import user data from a JSON file
import Header from "../support/page_objects/header";
const homePage = new HomePage();
const loginPage = new LoginPage();
const header = new Header();

describe("login", () => {
  it("logs in", () => {
    cy.visit(""); // Visit the base URL

    // Perform the login steps
    header.loginLink(); // Click the login link in the header
    loginPage.login(userData); // Fill out and submit the login form with user data
    homePage.isLogedIn(); // Verify the user is logged in
    header.logoutLink(); // Click the logout link in the header
  });
});
