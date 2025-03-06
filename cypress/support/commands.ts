/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare namespace Cypress {
//   interface Chainable<Subject> {
//     // See here for a good explanation: https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
//     // of the TS import() syntax
//   }

//   interface Cypress {
//     env(key: "USER_EMAIL" | "USER_PASSWORD"): string;
//   }

//   // The types below are Cypress' internals and should be used with care
//   interface Command {
//     hasPreviouslyLinkedCommand(): boolean;
//   }

//   interface EnqueuedCommandAttributes {
//     timeout?: number;
//   }
// }

// interface JQuery<TElement extends HTMLElement> {
//   selector: string;
// }
