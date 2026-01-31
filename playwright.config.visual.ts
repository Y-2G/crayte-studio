import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e/visual',
  snapshotDir: './e2e/visual/__screenshots__',
  outputDir: './e2e/visual/test-results',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: './e2e/visual/report', open: 'never' }],
  ],

  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },

  use: {
    baseURL: 'http://localhost:6007',
    // animations: 'disabled', // Note: animations option not available in current Playwright version
  },

  projects: [
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
    },
  ],

  webServer: {
    command: 'npx serve storybook-static -l 6007 --no-clipboard -c ../serve-storybook.json',
    port: 6007,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
