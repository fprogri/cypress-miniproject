class Header {
  elements = {
    loginLink: () => cy.get(".ico-login"),
    logoutLink: () => cy.get(".ico-logout"),
    notification: () => cy.get(".bar-notification"),
    closeButton: () => cy.get(".close"),
    wishlistQty: () => cy.get(".wishlist-qty"),
    cartQty: () => cy.get(".cart-qty"),
    cartTab: () => cy.get("#flyout-cart"),
    goToCartButton: () => cy.get(".buttons > .button-1"),
    loadAnimation: () => cy.get(".ajax-loading-block-window"),
  };

  // checks if the loading animation is visible and waits for it to not be visible
  pageLoad() {
    this.elements.loadAnimation().then(($el) => {
      if ($el.is(":visible")) {
        this.elements.loadAnimation().should("not.be.visible");
      }
    });
  }

  // explicit wait used across the tests (as required)
  waitLoad() {
    cy.wait(500);
  }

  // clicks the login lin on the header
  loginLink() {
    this.elements.loginLink().click();
  }

  // clicks the logout link on the header
  logoutLink() {
    this.elements.logoutLink().click();
  }

  // Check if the wishlist quantity is as expected
  wishlistQtyIs(nr) {
    this.elements.wishlistQty().should("have.text", `(${nr})`);
  }

  // Check if the cart quantity is as expected
  cartQtyIs(nr) {
    this.elements.cartQty().should("have.text", `(${nr})`);
  }

  //navigates to the cart page through the cart popup on the header
  goToCart() {
    this.elements.cartTab().invoke("show"); // simulates hovering on the cart
    this.waitLoad();
    this.elements.goToCartButton().should("be.visible").click();
    cy.url().should("contain", "cart");
  }
}

export default Header;
