import { Page } from '@playwright/test';

export class AlertsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demoqa.com/alerts');
  }

  async clickAlertButton() {
    await this.page.click('#alertButton');
  }

  async clickTimerAlertButton() {
    await this.page.click('#timerAlertButton');
  }

  async clickConfirmButton() {
    await this.page.click('#confirmButton');
  }

  async clickPromptButton() {
    await this.page.click('#promtButton');
  }

  async getConfirmResult() {
    return this.page.textContent('#confirmResult');
  }
  async getPromptResult() {
    return this.page.textContent('#promptResult');
  }

}


