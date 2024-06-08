class Header {
  elements = {
    loginLink: () => cy.get(".ico-login"),
    logoutLink: () => cy.get(".ico-logout"),
    notification: () => cy.get(".bar-notification"),
    closeButton: () => cy.get(".close"),
    wishlistQty: () => cy.get(".wishlist-qty"),
    cartQty: () => cy.get(".cart-qty"),
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
}

export default Header;
