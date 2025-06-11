import { defineConfig } from '@playwright/test';

const viewports = [
  { width: 1920, height: 1080 },
  { width: 1366, height: 768 },
];

const browsers = ['chromium', 'firefox'] as const;

const projects = browsers.flatMap(browser =>
  viewports.map(viewport => ({
    name: `${browser} ${viewport.width}x${viewport.height}`,
    use: { browserName: browser, viewport },
  }))
);

export default defineConfig({
  testDir: './tests',
  retries: 2,
  timeout: 120000,
  use: { headless: true, screenshot: 'only-on-failure' },
  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  workers: process.env.CI ? 4 : undefined,
  projects,
});
