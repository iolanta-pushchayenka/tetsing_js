import { Page, Locator } from '@playwright/test';

export class FormPage {
  private url = 'https://demoqa.com/automation-practice-form';

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private mobileInput: Locator;
  private submitButton: Locator;
  private modal: Locator;
  private modalHeader: Locator;
  private genderRadio: (label: number) => Locator;
  private modalValueCell: (label: string) => Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.modalHeader = page.locator('#example-modal-sizes-title-lg');
    this.genderRadio = (label: number) =>
      this.page.locator(`label[for="gender-radio-${label}"]`);
    this.modalValueCell = (label: string) =>
      this.page.locator('td', { hasText: label }).locator('xpath=following-sibling::td');
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  async fillBasicInfo(user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    mobile: string;
  }) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.genderRadio(user.gender).click();
    await this.mobileInput.fill(user.mobile);
  }

  async submitForm() {
    await this.submitButton.click();
  }

  // Геттеры для теста
  getModal() {
    return this.modal;
  }

  getModalHeader() {
    return this.modalHeader;
  }

  getModalValue(label: string) {
    return this.modalValueCell(label);
  }
}

