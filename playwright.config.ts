import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    baseURL: 'https://yourapp.com',
  },
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
    { name: 'WebKit', use: { browserName: 'webkit' } }
  ]
});
