/// <reference types="cypress" />

import _ from "lodash";
import { CustomersTableHeaders } from "data/types/customers.types";
import { CustomersPage, HomePage } from "pages";
import { LoginPageService, HomePageService } from "services";
import { getDateInDateAndTimeFormat } from "utils/date/data";

describe("[Component] [Customers] [Sorting]", () => {
  const requestUrl = new RegExp(/\/api\/customers(\?.*)?/);

  context(`[Query params]`, () => {
    beforeEach(() => {
      LoginPageService.openPortal();
      LoginPageService.loginAsAdmin();
      HomePageService.openCustomersPage();
    });

    const headers: CustomersTableHeaders[] = ["Country", "Email", "Name", "Created On"];

    for (const header of headers) {
      it(`Should check query for ${header} and asc`, () => {
        cy.intercept("GET", requestUrl).as("customers");
        CustomersPage["Sort Table Header"](header).click();
        cy.wait("@customers").then((res) => {
          expect(res.request.url).to.contain(`/api/customers?sortField=${_.camelCase(header)}&sortOrder=asc`);
        });
        CustomersPage.getTableData().then((data) => console.log(data));
      });
    }

    for (const header of headers) {
      it(`Should check query for ${header} and desc`, () => {
        CustomersPage.clickOnTableHeader(header);
        cy.intercept("GET", requestUrl).as("customers");
        CustomersPage["Sort Table Header"](header).click();
        cy.wait("@customers").then((res) => {
          expect(res.request.url).to.contain(`/api/customers?sortField=${_.camelCase(header)}&sortOrder=desc`);
        });
      });
    }
  });

  context.only(`[Table data]`, () => {
    const customers = [
      {
        _id: "67c4878c7b4bcc16671b083d",
        email: "Lindsey42@gmail.com",
        name: "Name eGqxppMWZkJOzxFpyWTARaVzoogBkwouIik",
        country: "Belarus",
        city: "City CiWhpJyPfNunROo",
        street: "Street 3gG1fAcJogHs7vXthfBpqVDJzMcMXHNLE",
        house: 524,
        flat: 7683,
        phone: "+756710331586",
        createdOn: "2025-03-02T16:30:04.000Z",
        notes:
          "Notes asiZlbwtwXaVLuEHXoZzDoOauNuTLAbDmsPIJsGwmdQqxpgoLkEOkRgaKIXArrQbTcuHboidBLTEgrFZTFhHLvTbRHDuVzQgmyoAfBlhDLZUNJNnsIzVFzLSibcBsGRyEYfSwHdVXegBorlRonYyoizjJbWTppJLkXIdsDmzKollrDRHsKvYUmAwheLiiQzGISLptjLwyBoalDFhhTWBTnWJIermDyyrBXEohLyhqHBqXifOtsxM",
      },
      {
        _id: "67c49ca47b4bcc16671b1ca0",
        email: "Donnell97@hotmail.com",
        name: "Name GYlfvMEPoNTXDuJhlyTBTizjAasKKkIQzjX",
        country: "Belarus",
        city: "City tXwaLQclYNiHqRK",
        street: "Street keTfT7K0gjH5FAqzG4P9S2v1bjQ9SVjjE",
        house: 363,
        flat: 3089,
        phone: "+47746114289",
        createdOn: "2025-03-02T18:00:04.000Z",
        notes:
          "Notes TsfYCziUkOrYLKZbdpXHmjZrpwNDiZwQRiSJsjRTqIttGlJypWUUwZoDHuFrFVJPtINBrVBXMXyrtcBfWZUgaWVpzoEWMzgwQvjvAoyfQaRIatkGKXOjZCyHYdGoTzuikGryeJxaijisRIQIWUMANYCOTRwehiZIdxsTSkfMBoEkIqqYWfZbgNjxcjOrHMPFUmabyFxmbTlEFGyaFHsbWuAjYholeWfpTWSxGUUSqXttakynWXHr",
      },
    ];

    const sortTableData = [
      {
        sortField: "email",
        sortOrder: "asc",
      },
      {
        sortField: "email",
        sortOrder: "desc",
      },
      {
        sortField: "name",
        sortOrder: "asc",
      },
      {
        sortField: "name",
        sortOrder: "desc",
      },
      {
        sortField: "country",
        sortOrder: "asc",
      },
      {
        sortField: "country",
        sortOrder: "desc",
      },
      {
        sortField: "createdOn",
        sortOrder: "asc",
      },
      {
        sortField: "createdOn",
        sortOrder: "desc",
      },
    ];

    beforeEach(() => {
      LoginPageService.openPortal();
      LoginPageService.loginAsAdmin();
    });

    for (const { sortField, sortOrder } of sortTableData) {
      it(`Should check table data for ${sortField} and ${sortOrder}`, () => {
        cy.intercept("GET", requestUrl, {
          statusCode: 200,
          body: {
            Customers: customers,
            IsSuccess: true,
            ErrorMessage: null,
            sorting: {
              sortField: sortField,
              sortOrder: sortOrder,
            },
          },
        }).as("getCustomers");
        HomePage.clickOnViewDetailsButton("customers");
        CustomersPage.getTableData().then((data) => {
          expect(data).to.deep.equal(
            customers
              .map((el) => _.pick(el, ["email", "name", "country", "createdOn"]))
              .map((el) => {
                return { ...el, createdOn: getDateInDateAndTimeFormat(el.createdOn) };
              })
          );
        });
      });
    }
  });
});
