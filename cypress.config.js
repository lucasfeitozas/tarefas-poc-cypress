const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Sobrescreva com CYPRESS_BASE_URL (ex.: URL do GitHub Pages ou do servidor local na pipeline).
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    retries: { runMode: 1, openMode: 0 },
  },
});
