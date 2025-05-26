// pages/TextBoxPage.ts
import { Page } from '@playwright/test';

export class TextBoxPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://demoqa.com/text-box', { waitUntil: 'load' });
  }

  async fillFullName(name: string) {
    await this.page.fill('#userName', name);
  }

  async fillEmail(email: string) {
    await this.page.fill('#userEmail', email);
  }

  async fillCurrentAddress(address: string) {
    await this.page.fill('#currentAddress', address);
  }

  async fillPermanentAddress(address: string) {
    await this.page.fill('#permanentAddress', address);
  }

  async submitForm() {
    await this.page.click('#submit');
  }

  // Проверка результатов после сабмита (выводится в div с id="output")
  async getOutputText(selector: string) {
    return await this.page.textContent(selector);
  }
}
