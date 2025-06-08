import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pageObject/AlertsPage';

type PromptTestData = {
  dialogType: 'prompt';
  dialogMessage: string;
  promptInput: string;
  afterDialogCheck: (alertsPage: AlertsPage, testInput: string) => Promise<void>;
  buttonClickMethod: keyof AlertsPage;
};

type NonPromptTestData = {
  dialogType: 'alert' | 'confirm';
  dialogMessage: string;
  afterDialogCheck: (alertsPage: AlertsPage) => Promise<void>;
  buttonClickMethod: keyof AlertsPage;
};

type DialogTestData = PromptTestData | NonPromptTestData;

const alertTests: DialogTestData[] = [
  {
    buttonClickMethod: 'clickAlertButton',
    dialogType: 'alert',
    dialogMessage: 'You clicked a button',
    afterDialogCheck: async () => {},
  },
  {
    buttonClickMethod: 'clickTimerAlertButton',
    dialogType: 'alert',
    dialogMessage: 'This alert appeared after 5 seconds',
    afterDialogCheck: async () => {},
  },
  {
    buttonClickMethod: 'clickConfirmButton',
    dialogType: 'confirm',
    dialogMessage: 'Do you confirm action?',
    afterDialogCheck: async (alertsPage: AlertsPage) => {
      const confirmResult = await alertsPage.getConfirmResult();
      expect(confirmResult).toContain('You selected Ok');
    },
  },
  {
    buttonClickMethod: 'clickPromptButton',
    dialogType: 'prompt',
    dialogMessage: 'Please enter your name',
    promptInput: 'Playwright Test',
    afterDialogCheck: async (alertsPage: AlertsPage, testInput: string) => {
      const promptResult = await alertsPage.getPromptResult();
      expect(promptResult).toContain(`You entered ${testInput}`);
    },
  },
];

test.describe('run Alerts Page Tests', () => {
  for (const testData of alertTests) {
    test(`Check ${testData.dialogType} triggered by ${testData.buttonClickMethod}`, async ({ page }) => {
      const alertsPage = new AlertsPage(page);
      await alertsPage.goto();

      page.once('dialog', async dialog => {
        expect(dialog.type()).toBe(testData.dialogType);
        expect(dialog.message()).toBe(testData.dialogMessage);

        if (testData.dialogType === 'prompt') {
          await dialog.accept(testData.promptInput);
        } else {
          await dialog.accept();
        }
      });

      await (alertsPage[testData.buttonClickMethod] as () => Promise<void>)();

      if (testData.dialogType === 'prompt') {
        await testData.afterDialogCheck(alertsPage, testData.promptInput);
      } else {
        await testData.afterDialogCheck(alertsPage);
      }
    });
  }
});
