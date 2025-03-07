import customersPage from "pages/customers/customers.page";
import homePage from "pages/home.page";

class HomePageService {
  private homePage = homePage;
  private customersPage = customersPage;

  openCustomersPage() {
    this.homePage.clickOnViewDetailsButton("customers");
    this.customersPage.waitForOpened();
  }
}

export default new HomePageService();
