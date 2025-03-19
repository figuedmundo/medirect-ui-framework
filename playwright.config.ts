// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://www.medirect.com.mt',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } }
  ],
  reporter: [
    ['list'], // Default console reporter
    ['html',
      { outputFolder: 'playwright-report' }
    ],
    ['json', { outputFile: 'test-results.json' }],
  ],
});
