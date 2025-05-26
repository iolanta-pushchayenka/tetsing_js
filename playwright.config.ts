import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',

  // 🧪 Общий тайм-аут для одного теста (60 секунд вместо 30)
  timeout: 60000,

  // 🔄 Используемые параметры для каждой страницы и теста
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },

    // Увеличиваем таймауты ожиданий
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  // 📊 HTML отчет, сохраняется в /playwright-report
  reporter: [['html', { open: 'never' }]],

  // 🔁 Уменьшаем количество одновременно работающих процессов
  workers: 3, // По умолчанию было 6 — уменьшили до 3

  // 🌐 Кроссбраузерное тестирование
  projects: [
    { name: 'Chromium', use: { browserName: 'chromium' } },
    { name: 'Firefox', use: { browserName: 'firefox' } },
  ]
});
