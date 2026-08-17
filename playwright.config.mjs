import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './scripts/viewport-audit',
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  reporter: [['list']],
  timeout: 30000,
  expect: { timeout: 5000 },
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 120000,
  },
})
