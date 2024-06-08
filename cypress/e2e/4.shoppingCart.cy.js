import HomePage from "../support/page_objects/homePage";
import userData from "../fixtures/userData.json";
import Header from "../support/page_objects/header";
import NotebooksPage from "../support/page_objects/notebooksPage";
import ProductPage from "../support/page_objects/productPage";
import CartPage from "../support/page_objects/cartPage";
const homePage = new HomePage();
const header = new Header();
const notebooksPage = new NotebooksPage();
const productPage = new ProductPage();
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
