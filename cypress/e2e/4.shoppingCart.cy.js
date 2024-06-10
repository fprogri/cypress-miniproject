import userData from "../fixtures/userData.json";
import Header from "../support/page_objects/header";
import CartPage from "../support/page_objects/cartPage";
const header = new Header();
const cartPage = new CartPage();

describe("shopping cart", () => {
  it("shopping cart", () => {
    cy.login(userData); // Custom command to log in using user data
    cy.visit("");
    header.goToCart(); // Navigate to the Cart page
    cartPage.assertButtons(); // Verify that the necessary buttons are visible on the Cart page
    cartPage.assertTotal(); // Verify the total price calculation on the Cart page and the total element has specified color
  });
});
