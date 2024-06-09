import CartPage from "../support/page_objects/cartPage";
import userData from "../fixtures/userData.json";
const cartPage = new CartPage();

describe("empty cart", () => {
  it("empty shopping cart", () => {
    cy.login(userData);
    cartPage.visit();
    cartPage.removeItem(0);
    cartPage.estimateShipping(1, 1, 607080);
    cartPage.removeItem(0);
    cartPage.removeItem(0);
    cartPage.isEmpty();
  });
});
