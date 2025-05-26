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
    await this.page.goto(this.url);
  }

  async fillBasicInfo(user: { firstName: string; lastName: string; email: string; gender: number; mobile: string }) {
    const { firstName, lastName, email, gender, mobile } = user;
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.email, email);
    await this.page.click(this.genderRadio(gender));
    await this.page.fill(this.mobile, mobile);
  }

  async submitForm() {
    await this.page.click(this.submitBtn);
  }

  async checkModal(user: { firstName: string; lastName: string; email: string; gender: number; mobile: string }) {
    const modal = this.page.locator('.modal-content');
    await modal.waitFor({ state: 'visible' });

    const header = this.page.locator('#example-modal-sizes-title-lg');
    await expect(header).toHaveText('Thanks for submitting the form');

    const fieldMap = {
      'Student Name': `${user.firstName} ${user.lastName}`,
      'Student Email': user.email,
      'Gender': user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : 'Other',
      'Mobile': user.mobile,
    };

    for (const [label, expectedValue] of Object.entries(fieldMap)) {
      const cell = this.page.locator('td', { hasText: label }).locator('xpath=following-sibling::td');
      await expect(cell).toHaveText(expectedValue);
    }
  }
}
