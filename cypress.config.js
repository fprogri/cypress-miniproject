const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://demo.nopcommerce.com",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    watchForFileChanges: false,
    viewportWidth: 1400,
    viewportHeight: 800,
    video: false,
    // experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      // implement node event listeners here
    },
  },
});
