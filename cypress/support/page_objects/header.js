class Header {
  elements = {
    loginLink: () => cy.get(".ico-login"),
    logoutLink: () => cy.get(".ico-logout"),
    notification: () => cy.get(".bar-notification"),
    closeButton: () => cy.get(".close"),
    wishlistQty: () => cy.get(".wishlist-qty"),
    cartQty: () => cy.get(".cart-qty"),
    loadApi: () => cy.intercept("/cdn-cgi/rum?"),
    cartTab: () => cy.get("#flyout-cart"),
    goToCartButton: () => cy.get(".buttons > .button-1"),
    loadAnimation: () => cy.get(".ajax-loading-block-window"),
  };
  pageLoad() {
    this.elements.loadAnimation().then(($el) => {
      if ($el.is(":visible")) {
        this.elements.loadAnimation().should("not.be.visible");
      }
    });
  }

  waitLoad() {
    this.elements.loadApi().as("load");
    cy.wait("@load");
  }

  loginLink() {
    this.elements.loginLink().click();
  }

  logoutLink() {
    this.elements.logoutLink().click();
  }

  wishlistQtyIs(nr) {
    this.elements.wishlistQty().should("have.text", `(${nr})`);
  }

  cartQtyIs(nr) {
    this.elements.cartQty().should("have.text", `(${nr})`);
  }

  goToCart() {
    this.elements.cartTab().invoke("show");
    this.waitLoad();
    this.elements.goToCartButton().should("be.visible").click();
    cy.url().should("contain", "cart");
  }
}

export default Header;
