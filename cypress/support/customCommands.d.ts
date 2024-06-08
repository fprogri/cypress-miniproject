declare namespace Cypress {
  interface Chainable<Subject> {
    login(object: any): Chainable<any>;
  }
}