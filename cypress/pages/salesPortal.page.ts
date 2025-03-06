export abstract class SalesPortalPage {
  spinner = () => cy.get(".spinner-border");
  abstract readonly uniqueElement: () => Cypress.Chainable;

  waitForSpinnerToHide() {
    this.spinner().should("not.exist");
  }

  openSalesPortal() {
    cy.visit("./");
  }

  waitForOpened() {
    this.uniqueElement().should("be.visible");
    this.waitForSpinnerToHide();
  }
}
