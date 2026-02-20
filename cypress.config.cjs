const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    specPattern: 'cypress/e2e/**/*.spec.{ts,js}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // configure node event listeners here if needed
      return config;
    },
  },
});
