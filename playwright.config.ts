import { defineConfig } from '@playwright/test'


export default defineConfig({
  testDir: './tests',
  retries: 2,
 
  timeout: 120000,


  
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    
    actionTimeout: 15000,
  },


  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]], 
  
  workers: 2, 

  projects: [
    {
      name: 'Chromium 1920x1080',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Chromium 1366x768',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
        launchOptions: {
          slowMo: 100,
        },
      },
    },
    {
      name: 'Firefox 1920x1080',
      use: {
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          slowMo: 100,
        },
      },
    },
    {
      name: 'Firefox 1366x768',
      use: {
        browserName: 'firefox',
        viewport: { width: 1366, height: 768 },
        launchOptions: {
          slowMo: 100,
        },
      },
    },
  ],
});
