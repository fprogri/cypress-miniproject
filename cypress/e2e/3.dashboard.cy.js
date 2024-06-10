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
    cy.login(userData); // Custom command to log in using user data
    cy.visit("");
    homePage.goToNotebooksPage(); // Navigate to the Notebooks page
    notebooksPage.pageSize("9"); // Change the number of items displayed per page to 9
    notebooksPage.itemsOnPage(6); // Verify there are 6 items displayed on the page
    notebooksPage.check16gb(); // Filter by 16GB option
    notebooksPage.itemsOnPage(1); // Verify there is 1 item displayed after filtering
    notebooksPage.check16gb(); // Reapply the 16GB filter (likely meant to toggle the filter)
    notebooksPage.itemsOnPage(6); // Verify there are 6 items displayed on the page again

    // Add the 2nd and 3rd items to the wishlist
    notebooksPage.addToWishlist(1);
    notebooksPage.addToWishlist(2);

    notebooksPage.openDetails(3); // Open the details page for the 4th item
    productPage.addToCart(); // Add the product to the cart from the details page
    notebooksPage.visit(); // Visit the Notebooks page again

    // Add the 5th and 6th items to the cart
    notebooksPage.addToCart(4);
    notebooksPage.addToCart(5);

    // Verify the wishlist and cart quantities in the header
    header.wishlistQtyIs(2);
    header.cartQtyIs(3);
  });
});
