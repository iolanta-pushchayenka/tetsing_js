import { Page, expect } from '@playwright/test';

export class FormPage {
  constructor(private page: Page) {}

  private url = 'https://demoqa.com/automation-practice-form';

  private firstName = '#firstName';
  private lastName = '#lastName';
  private email = '#userEmail';
  private genderRadio = (label: number) => `label[for="gender-radio-${label}"]`;
  private mobile = '#userNumber';
  private submitBtn = '#submit';

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async fillBasicInfo(user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    mobile: string;
  }) {
    const { firstName, lastName, email, gender, mobile } = user;

    // ⏳ Ожидаем, что поля видимы перед вводом
    await expect(this.page.locator(this.firstName)).toBeVisible();
    await this.page.fill(this.firstName, firstName);

    await expect(this.page.locator(this.lastName)).toBeVisible();
    await this.page.fill(this.lastName, lastName);

    await expect(this.page.locator(this.email)).toBeVisible();
    await this.page.fill(this.email, email);

    await expect(this.page.locator(this.genderRadio(gender))).toBeVisible();
    await this.page.click(this.genderRadio(gender));

    await expect(this.page.locator(this.mobile)).toBeVisible();
    await this.page.fill(this.mobile, mobile);
  }

  async submitForm() {
    await expect(this.page.locator(this.submitBtn)).toBeVisible();
    await this.page.click(this.submitBtn);
  }

  async checkModal(user: {
    firstName: string;
    lastName: string;
    email: string;
    gender: number;
    mobile: string;
  }) {
    const modal = this.page.locator('.modal-content');
    await expect(modal).toBeVisible({ timeout: 10000 });

    const header = this.page.locator('#example-modal-sizes-title-lg');
    await expect(header).toHaveText('Thanks for submitting the form');

    const fieldMap = {
      'Student Name': `${user.firstName} ${user.lastName}`,
      'Student Email': user.email,
      Gender: user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : 'Other',
      Mobile: user.mobile,
    };

    for (const [label, expectedValue] of Object.entries(fieldMap)) {
      const cell = this.page
        .locator('td', { hasText: label })
        .locator('xpath=following-sibling::td');
      await expect(cell).toHaveText(expectedValue);
    }
  }
}
