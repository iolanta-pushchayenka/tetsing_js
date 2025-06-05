import { Page, expect, Locator } from '@playwright/test';

export class FormPage {
  private url = 'https://demoqa.com/automation-practice-form';

  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private mobileInput: Locator;
  private submitButton: Locator;
  private modal: Locator;
  private modalHeader: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.mobileInput = page.locator('#userNumber');
    this.submitButton = page.locator('#submit');
    this.modal = page.locator('.modal-content');
    this.modalHeader = page.locator('#example-modal-sizes-title-lg');
  }
//TODO remove locator to the constructor
  private genderRadio = (label: number): Locator =>
    this.page.locator(`label[for="gender-radio-${label}"]`);

  private modalValueCell = (label: string): Locator =>
    this.page.locator('td', { hasText: label }).locator('xpath=following-sibling::td');

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
    const { firstName, lastName, email, gender, mobile } = user;

    await expect(this.firstNameInput).toBeVisible();
    await this.firstNameInput.fill(firstName);

    await expect(this.lastNameInput).toBeVisible();
    await this.lastNameInput.fill(lastName);

    await expect(this.emailInput).toBeVisible();
    await this.emailInput.fill(email);

    const genderOption = this.genderRadio(gender);
    await expect(genderOption).toBeVisible();
    await genderOption.click();

    await expect(this.mobileInput).toBeVisible();
    await this.mobileInput.fill(mobile);
  }

  async submitForm() {
    await expect(this.submitButton).toBeVisible();
    await this.submitButton.click();
  }

  async checkModal(user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    mobile: string;
  }) {
    await expect(this.modal).toBeVisible();
    await expect(this.modalHeader).toHaveText('Thanks for submitting the form');

    const fieldMap = {
      'Student Name': `${user.firstName} ${user.lastName}`,
      'Student Email': user.email,
      Gender: user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : 'Other',
      Mobile: user.mobile,
    };

    for (const [label, expectedValue] of Object.entries(fieldMap)) {
      const cell = this.modalValueCell(label);
      await expect(cell).toHaveText(expectedValue);
    }
  }
}

