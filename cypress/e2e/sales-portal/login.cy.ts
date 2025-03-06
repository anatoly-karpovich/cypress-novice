/// <reference types="cypress" />

import { HomePage, LoginPage } from "pages";
import { LoginPageService } from "services";

describe("[UI] [Login]", () => {
  it("Should login with valid credentials using Page Objects", () => {
    const { USER_EMAIL, USER_PASSWORD } = Cypress.env();
    LoginPage.openSalesPortal();
    LoginPage.fillCredentials({ email: USER_EMAIL, password: USER_PASSWORD });
    LoginPage.submit();
    cy.intercept("GET", "/api/metrics").as("metrics");
    cy.wait("@metrics").then((res) => console.log(res));
    HomePage.waitForOpened();
    HomePage.clickOnViewDetailsButton("orders");
  });

  it("Should login with valid credentials using Page Services", () => {
    LoginPageService.openPortal();
    LoginPageService.loginAsAdmin();
  });
});
