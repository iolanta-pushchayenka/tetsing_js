import { Page, Locator, expect } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;

  // Вывод
  readonly output: Locator;
  readonly nameOutput: Locator;
  readonly emailOutput: Locator;
  readonly currentAddressOutput: Locator;
  readonly permanentAddressOutput: Locator;

  // Поля формы
  private readonly nameInput: Locator;
  private readonly emailInput: Locator;
  private readonly currentAddressInput: Locator;
  private readonly permanentAddressInput: Locator;
  private readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitBtn = page.locator('#submit');

    this.output = page.locator('#output');
    this.nameOutput = this.output.locator('#name');
    this.emailOutput = this.output.locator('#email');
    this.currentAddressOutput = this.output.locator('#currentAddress');
    this.permanentAddressOutput = this.output.locator('#permanentAddress');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/text-box', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
  }

  async fillFullName(name: string) {
    await expect(this.nameInput).toBeVisible();
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);
  }

  async fillCurrentAddress(address: string) {
    await expect(this.currentAddressInput).toBeVisible();
    await this.currentAddressInput.fill(address);
  }

  async fillPermanentAddress(address: string) {
    await expect(this.permanentAddressInput).toBeVisible();
    await this.permanentAddressInput.fill(address);
  }

  async submitForm() {
    await expect(this.submitBtn).toBeVisible();
    await this.submitBtn.click();
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




