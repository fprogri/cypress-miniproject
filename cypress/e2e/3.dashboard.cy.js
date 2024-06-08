import HomePage from "../support/page_objects/homePage";
import userData from "../fixtures/userData.json";
import Header from "../support/page_objects/header";
import NotebooksPage from "../support/page_objects/notebooksPage";
import ProductPage from "../support/page_objects/productPage";
const homePage = new HomePage();
const header = new Header();
const notebooksPage = new NotebooksPage();
const productPage = new ProductPage();

describe("dashboard", () => {
  it("dashboard", () => {
    cy.login(userData);
    cy.visit("");
    homePage.goToNotebooksPage();
    notebooksPage.pageSize("9");
    notebooksPage.itemsOnPage(6);
    notebooksPage.check16gb();
    notebooksPage.itemsOnPage(1);
    notebooksPage.check16gb();
    notebooksPage.itemsOnPage(6);
    notebooksPage.addToWishlist(1);
    notebooksPage.addToWishlist(2);
    notebooksPage.openDetails(3);
    productPage.addToCart();
    notebooksPage.visit();
    notebooksPage.addToCart(4);
    notebooksPage.addToCart(5);
    header.wishlistQtyIs(2);
    header.cartQtyIs(3);
  });
});
