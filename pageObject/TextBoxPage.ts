import { Page, Locator } from '@playwright/test';

export class TextBoxPage {
  readonly page: Page;
  readonly output: Locator;
  readonly nameOutput: Locator;
  readonly emailOutput: Locator;
  readonly currentAddressOutput: Locator;
  readonly permanentAddressOutput: Locator;

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
    await this.nameInput.fill(name);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillCurrentAddress(address: string) {
    await this.currentAddressInput.fill(address);
  }

  async fillPermanentAddress(address: string) {
    await this.permanentAddressInput.fill(address);
  }

  async submitForm() {
    await this.submitBtn.click();
  }

  // Методы получения значений из output
  async isOutputVisible(): Promise<boolean> {
    return await this.output.isVisible();
  }

  async getNameOutput(): Promise<string> {
    return (await this.nameOutput.textContent())?.trim() ?? '';
  }

  async getEmailOutput(): Promise<string> {
    return (await this.emailOutput.textContent())?.trim() ?? '';
  }

  async getCurrentAddressOutput(): Promise<string> {
    return (await this.currentAddressOutput.textContent())?.trim() ?? '';
  }

  async getPermanentAddressOutput(): Promise<string> {
    return (await this.permanentAddressOutput.textContent())?.trim() ?? '';
  }
}




