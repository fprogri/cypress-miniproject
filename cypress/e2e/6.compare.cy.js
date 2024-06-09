import userData from "../fixtures/userData.json";
import NotebooksPage from "../support/page_objects/notebooksPage";
import ProductPage from "../support/page_objects/productPage";
import ComparePage from "../support/page_objects/comparePage";
import WishlistPage from "../support/page_objects/wishlistPage";
const notebooksPage = new NotebooksPage();
const productPage = new ProductPage();
const comparePage = new ComparePage();
const wishlistPage = new WishlistPage();

describe("compare list", () => {
  const productName = "Samsung Series 9 NP900X4C Premium Ultrabook";

  beforeEach(() => {
    cy.login(userData);
    notebooksPage.visit();
  });

  it("add item to compare list", () => {
    notebooksPage.elements.grid().contains(productName).click();
    productPage.addToCompare(productName);
    comparePage.vist();
    comparePage.elements.table().should("contain", productName);
  });

  it("add item to wishlist", () => {
    notebooksPage.elements.grid().contains(productName).click();
    productPage.addToWishlist(productName);
    wishlistPage.vist();
    wishlistPage.elements.table().should("contain", productName);
  });
});
