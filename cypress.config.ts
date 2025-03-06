import { defineConfig } from "cypress";
import dotenvPlugin from "cypress-dotenv";

export default defineConfig({
  e2e: {
    baseUrl: "https://anatoly-karpovich.github.io/aqa-course-project/",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/sales-portal/**/*.cy.ts",
    setupNodeEvents(on, config) {
      // continue loading other plugins
      const updatedConfig = dotenvPlugin(config, {}, true);
      // continue loading other plugins
      return updatedConfig;
    },
  },
});
