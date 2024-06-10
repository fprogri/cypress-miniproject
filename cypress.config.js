const { defineConfig } = require("cypress");

module.exports = defineConfig({
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
    reporter: "spec",
    // experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
