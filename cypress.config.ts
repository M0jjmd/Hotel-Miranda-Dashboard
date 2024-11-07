import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: 'http://hotelmirandadashboard.s3-website.eu-north-1.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

  },
})