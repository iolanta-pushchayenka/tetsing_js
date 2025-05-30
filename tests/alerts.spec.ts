import { test } from '@playwright/test';
import { AlertsPage } from '../pageObject/AlertsPage';


test.describe('Alerts Page Tests', () => {
  test('Check all alerts', async ({ page }) => {

    
    const alertsPage = new AlertsPage(page);
    await alertsPage.goto();

    await alertsPage.clickAlertButton();
    await alertsPage.clickTimerAlertButton();
    await alertsPage.clickConfirmButton();
    await alertsPage.clickPromptButton();
  });
});