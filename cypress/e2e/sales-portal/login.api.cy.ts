/// <reference types="cypress" />

describe("[API] [Login]", () => {
  it("Should login with valid credentials", () => {
    const { USER_EMAIL, USER_PASSWORD } = Cypress.env();
    cy.request({
      method: "POST",
      url: "https://aqa-course-project.app/api/login",
      body: {
        username: USER_EMAIL,
        password: USER_PASSWORD,
      },
    }).then((res: Cypress.Response<object>) => {
      expect(res.status).to.eq(200);
      expect(res.headers).to.have.property("authorization");
    });
  });
});
