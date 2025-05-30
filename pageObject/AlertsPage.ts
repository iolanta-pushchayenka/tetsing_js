import { Page, Locator } from '@playwright/test';

export class AlertsPage {
  readonly page: Page;
  readonly alertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly confirmResult: Locator;
  readonly promptResult: Locator;

  constructor(page: Page) {
    this.page = page; 
    this.alertButton = page.locator('#alertButton');
    this.timerAlertButton = page.locator('#timerAlertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promptButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/alerts');
  }

  async clickAlertButton() {
    await this.alertButton.waitFor({ state: 'visible' });
    await this.alertButton.click();
    //await this.alertButton.click();
  }

  async clickTimerAlertButton() {
    await this.timerAlertButton.click();
  }

  async clickConfirmButton() {
    await this.confirmButton.click();
  }

  async clickPromptButton() {
    await this.promptButton.click();
  }

  async getConfirmResult() {
    return this.confirmResult.textContent();
  }

  async getPromptResult() {
    return this.promptResult.textContent();
  }
}
