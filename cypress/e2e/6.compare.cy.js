import userData from "../fixtures/userData.json";
import NotebooksPage from "../support/page_objects/notebooksPage";
import ProductPage from "../support/page_objects/productPage";
import ComparePage from "../support/page_objects/comparePage";
import WishlistPage from "../support/page_objects/wishlistPage";
const notebooksPage = new NotebooksPage();
const productPage = new ProductPage();
const comparePage = new ComparePage();
const wishlistPage = new WishlistPage();

// the 6th test case was not very clear if the test was to add the item to the compare list or to wishlist
// so i have done both tests below

describe("compare list", () => {
  const productName = "Samsung Series 9 NP900X4C Premium Ultrabook"; // Define the product name to be used in tests

  // Hook to run before each test case
  beforeEach(() => {
    cy.login(userData);
    notebooksPage.visit();
  });

  // Test case to add an item to the compare list
  it("add item to compare list", () => {
    // Find the product in the grid and click on it to open its details
    notebooksPage.elements.grid().contains(productName).click();

    // Add the product to the compare list
    productPage.addToCompare(productName);

    // Visit the Compare page and verify that the product is found in the compare list
    comparePage.vist();
    comparePage.foundProduct(productName);
  });

  // Test case to add an item to the wishlist
  it("add item to wishlist", () => {
    // Find the product in the grid and click on it to open its details
    notebooksPage.elements.grid().contains(productName).click();

    // Add the product to the wishlist
    productPage.addToWishlist(productName);

    // Visit the Wishlist page and verify that the product is found in the wishlist
    wishlistPage.vist();
    wishlistPage.foundProduct(productName);
  });
});
