import { SalesPortalPage } from "pages/salesPortal.page";

class HomePage extends SalesPortalPage {
  readonly uniqueElement = () => cy.get(".welcome-text");
  readonly ordersButton = () => cy.get("#orders-from-home");
  readonly productsButton = () => cy.get("#products-from-home");
  readonly customersButton = () => cy.get("#customers-from-home");

  clickOnViewDetailsButton(moduleName: "products" | "customers" | "orders") {
    this[`${moduleName}Button`]().click();
  }
}

export default new HomePage();
