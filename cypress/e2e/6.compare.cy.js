import userData from "../fixtures/userData.json";
import NotebooksPage from "../support/page_objects/notebooksPage";
import ProductPage from "../support/page_objects/productPage";
import ComparePage from "../support/page_objects/comparePage";
const notebooksPage = new NotebooksPage();
const productPage = new ProductPage();
const comparePage = new ComparePage();

describe("compare list", () => {
  beforeEach(() => {
    cy.login(userData);
    notebooksPage.visit();
    notebooksPage.openDetails(5);
  });

  it("add item to compare list", () => {
    productPage.compareItem();
    comparePage.vist();
  });
});
