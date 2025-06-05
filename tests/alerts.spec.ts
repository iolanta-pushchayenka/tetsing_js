import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pageObject/AlertsPage';

test.describe('Alerts Page Tests', () => {
  test('Check all alerts', async ({ page }) => {
    const alertsPage = new AlertsPage(page);

    // Используем метод Page Object
    await alertsPage.goto();

    // Alert
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });
    await alertsPage.clickAlertButton();

    // Timer Alert
    const [timerDialog] = await Promise.all([
      page.waitForEvent('dialog'),
      alertsPage.clickTimerAlertButton(),
    ]);
    expect(timerDialog.type()).toBe('alert');
    expect(timerDialog.message()).toBe('This alert appeared after 5 seconds');
    await timerDialog.accept();

    // Confirm Alert
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      expect(dialog.message()).toBe('Do you confirm action?');
      await dialog.accept();
    });
    await alertsPage.clickConfirmButton();

    // ✅ Используем Page Object для получения результата
    const confirmResult = await alertsPage.getConfirmResult();
    expect(confirmResult).toContain('You selected Ok');

    // Prompt Alert
    const testInput = 'Playwright Test';
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      expect(dialog.message()).toBe('Please enter your name');
      await dialog.accept(testInput);
    });
    await alertsPage.clickPromptButton();

    // ✅ Используем Page Object для получения результата
    const promptResult = await alertsPage.getPromptResult();
    expect(promptResult).toContain(`You entered ${testInput}`);
  });
});
