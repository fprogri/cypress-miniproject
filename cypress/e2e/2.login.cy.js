import HomePage from "../support/page_objects/homePage";
import LoginPage from "../support/page_objects/loginPage";
import userData from "../fixtures/userData.json";
import Header from "../support/page_objects/header";
const homePage = new HomePage();
const loginPage = new LoginPage();
const header = new Header();

describe("login", () => {
  it("logs in", () => {
    cy.visit("");
    header.loginLink();
    loginPage.login(userData);
    homePage.isLogedIn();
    header.logoutLink();
  });
});
