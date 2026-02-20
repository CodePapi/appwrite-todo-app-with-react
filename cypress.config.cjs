const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:5173',
    specPattern: 'cypress/e2e/**/*.spec.{ts,js}',
    supportFile: 'cypress/support/e2e.ts',
    // increase default timeouts and enable retries to reduce CI flakiness
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 60000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: true,
    screenshotsFolder: 'cypress/screenshots',
    setupNodeEvents(on, config) {
      // configure node event listeners here if needed
      return config;
    },
  },
});
