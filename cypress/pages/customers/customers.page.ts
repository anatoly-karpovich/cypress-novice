import { CustomersTableHeaders } from "data/types/customers.types";
import { SalesPortalPage } from "pages/salesPortal.page";

export class CustomersPage extends SalesPortalPage {
  uniqueElement = () => cy.get("h2").contains("Customers List");

  readonly "Add New Customer button" = () => cy.get("button.page-title-header");
  readonly "Table row selector" = (customer: string) => `//tr[./td[.="${customer}"]]`;
  readonly "Edit button by table row" = (customer: string) =>
    cy.get(`${this["Table row selector"](customer)}//button[@title="Edit"]`);
  readonly "Empty table message" = () => cy.get("td.fs-italic");
  readonly "Customer Table Row by email" = (email: string) => cy.get(`tbody tr`).contains(email);

  readonly "Details button by table row" = (customer: string) =>
    cy.get(`${this["Table row selector"](customer)}//button[@title="Details"]`);
  readonly "Delete button by table row" = (customer: string) =>
    cy.get(`${this["Table row selector"](customer)}//button[@title="Delete"]`);
  readonly "Main Content" = () => cy.get(".bg-body:nth-child(2)");
  readonly "Filter Content" = () => cy.get(".bg-body:first-child");
  readonly "Delete Buttons" = () => cy.get('[title="Delete"]');
  readonly "Edit Buttons" = () => cy.get('[title="Edit"]');
  readonly "Details Buttons" = () => cy.get('[title="Details"]');
  readonly "Sort Table Header" = (field: CustomersTableHeaders) => cy.contains(field);
  readonly "Sorted Field" = () => cy.get('[current="true"]');
  readonly "Filter Button" = () => cy.get("#filter");

  readonly "Email cell" = () => cy.get("tbody tr td:nth-child(1)");
  readonly "Name cell" = () => cy.get("tbody tr td:nth-child(2)");
  readonly "Country cell" = () => cy.get("tbody tr td:nth-child(3)");
  readonly "Created On cell" = () => cy.get("tbody tr td:nth-child(4)");

  clickOnAddNewCustomer() {
    this["Add New Customer button"]().click();
  }

  clickOnEditCustomer(customerName: string) {
    this["Edit button by table row"](customerName).click();
  }

  clickOnDetailsCustomer(customerName: string) {
    this["Details button by table row"](customerName).click();
  }

  clickOnDeleteCustomer(customerName: string) {
    this["Delete button by table row"](customerName).click();
  }

  async clickOnTableHeader(field: CustomersTableHeaders) {
    this["Sort Table Header"](field).click();
    this.waitForOpened();
  }

  getTableData() {
    return cy
      .get("tbody tr") // Выбираем все строки таблицы
      .then((rows) => {
        const tableData: { email: string; name: string; country: string; createdOn: string }[] = [];

        cy.wrap(rows).each(($row) => {
          const email = Cypress.$($row).find("td:nth-child(1)").text().trim();
          const name = Cypress.$($row).find("td:nth-child(2)").text().trim();
          const country = Cypress.$($row).find("td:nth-child(3)").text().trim();
          const createdOn = Cypress.$($row).find("td:nth-child(4)").text().trim();

          tableData.push({ email, name, country, createdOn });
        });

        return cy.wrap(tableData); // Возвращаем массив данных
      });
  }
}

export default new CustomersPage();
