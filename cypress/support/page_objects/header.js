class Header {
  elements = {
    loginLink: () => cy.get(".ico-login"),
    logoutLink: () => cy.get(".ico-logout"),
    notification: () => cy.get(".bar-notification"),
    closeButton: () => cy.get(".close"),
    wishlistQty: () => cy.get(".wishlist-qty"),
    cartQty: () => cy.get(".cart-qty"),
    load: () => cy.intercept("/cdn-cgi/rum?").as("load"),
    cartTab: () => cy.get("#flyout-cart"),
    goToCartButton: () => cy.get(".buttons > .button-1"),
  };

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
    this.elements.load();
    cy.wait("@load");
    cy.wait("@load");
    this.elements.goToCartButton().should("be.visible").click();
    cy.url().should("contain", "cart");
  }
}

export default Header;
