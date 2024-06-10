import CartPage from "../support/page_objects/cartPage";
import userData from "../fixtures/userData.json";
const cartPage = new CartPage();

describe("empty cart", () => {
  it("empty shopping cart", () => {
    cy.login(userData); // Custom command to log in using user data

    cartPage.visit();

    cartPage.removeItem(0); // Remove the first item in the cart
    cartPage.estimateShipping(1, 1, 607080); // Estimate shipping with given country, state, and zip code

    cartPage.removeItem(0); // Remove the first item in the cart (second item overall)
    cartPage.removeItem(0); // Remove the first item in the cart (third item overall)

    cartPage.isEmpty(); // Check if the cart is empty
  });
});
