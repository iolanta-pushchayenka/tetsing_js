import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  readonly output: Locator;
  readonly nameOutput: Locator;
  readonly emailOutput: Locator;
  readonly currentAddressOutput: Locator;
  readonly permanentAddressOutput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.output = page.locator('#output');
    this.nameOutput = this.output.locator('#name');
    this.emailOutput = this.output.locator('#email');
    this.currentAddressOutput = this.output.locator('#currentAddress');
    this.permanentAddressOutput = this.output.locator('#permanentAddress');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/text-box', { timeout: 60000, waitUntil: 'domcontentloaded' });
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

  async expectOutputVisible() {
    await expect(this.output).toBeVisible();
  }

  async expectNameToBe(name: string) {
    await expect(this.nameOutput).toHaveText(`Name:${name}`);
  }

  async expectEmailToBe(email: string) {
    await expect(this.emailOutput).toHaveText(`Email:${email}`);
  }

  async expectCurrentAddressToBe(address: string) {
    await expect(this.currentAddressOutput).toHaveText(`Current Address :${address}`);
  }

  async expectPermanentAddressToBe(address: string) {
    await expect(this.permanentAddressOutput).toHaveText(`Permananet Address :${address}`);
  }
}




