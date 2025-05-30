import { defineConfig } from '@playwright/test'


export default defineConfig({
  testDir: './tests',

  // 🧪 Общий тайм-аут для одного теста (60 секунд вместо 30)
  timeout: 60000,


  // 🔄 Используемые параметры для каждой страницы и теста
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    

    // Увеличиваем таймауты ожиданий
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },


  // 📊 HTML отчет, сохраняется в /playwright-report
  //reporter: [['html', { open: 'never' }]],

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]], 
  
  // 🔁 Уменьшаем количество одновременно работающих процессов
  workers: 1, 


  // 🌐 Кроссбраузерное тестирование
  projects: [
    {
      name: 'Chromium 1920x1080',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          slowMo: 100,
        },
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
