import homePage from "pages/home.page";
import loginPage from "pages/login.page";

class LoginPageService {
  loginPage = loginPage;
  homePage = homePage;

  loginAsAdmin() {
    this.loginPage.fillCredentials({ email: Cypress.env("USER_EMAIL"), password: Cypress.env("USER_PASSWORD") });
    this.loginPage.submit();
    cy.intercept("GET", "/api/metrics").as("metrics");
    cy.wait("@metrics");
    this.homePage.waitForOpened();
  }

  openPortal() {
    this.loginPage.openSalesPortal();
  }
}

export default new LoginPageService();
