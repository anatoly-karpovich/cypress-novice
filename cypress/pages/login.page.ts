import { ICredentials } from "data/types/credentials";
import { SalesPortalPage } from "pages/salesPortal.page";

class LoginPage extends SalesPortalPage {
  readonly "emailInput" = () => cy.get("#emailinput");
  readonly "passwordInput" = () => cy.get("#passwordinput");
  readonly "loginButton" = () => cy.get('button[type="submit"]');
  readonly uniqueElement = this.emailInput;

  fillCredentials(credentials: ICredentials) {
    const { email, password } = credentials;
    this.emailInput().type(email);
    this.passwordInput().type(password);
  }

  submit() {
    this.loginButton().click();
  }
}

export default new LoginPage();
