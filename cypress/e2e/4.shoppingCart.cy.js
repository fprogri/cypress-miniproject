import userData from "../fixtures/userData.json";
import Header from "../support/page_objects/header";
import CartPage from "../support/page_objects/cartPage";
const header = new Header();
const cartPage = new CartPage();

describe("shopping cart", () => {
  it("shopping cart", () => {
    cy.login(userData);
    cy.visit("");
    header.goToCart();
    cartPage.assertButtons();
    cartPage.assertTotal();
  });
});
