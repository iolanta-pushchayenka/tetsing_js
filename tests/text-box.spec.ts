import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pageObject/TextBoxPage';
import { faker } from '@faker-js/faker';

test.describe('Text Box Page Tests', () => {
  test('Fill form and verify output with random data', async ({ page }) => {
    const textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate();

    const name = faker.person.fullName();
    const email = faker.internet.email();
    const currentAddress = faker.location.streetAddress();
    const permanentAddress = faker.location.secondaryAddress();

    await textBoxPage.fillFullName(name);
    await textBoxPage.fillEmail(email);
    await textBoxPage.fillCurrentAddress(currentAddress);
    await textBoxPage.fillPermanentAddress(permanentAddress);
    await textBoxPage.submitForm();

    expect(await textBoxPage.isOutputVisible()).toBe(true);
    expect(await textBoxPage.getNameOutput()).toBe(`Name:${name}`);
    expect(await textBoxPage.getEmailOutput()).toBe(`Email:${email}`);
    expect(await textBoxPage.getCurrentAddressOutput()).toBe(`Current Address :${currentAddress}`);
    expect(await textBoxPage.getPermanentAddressOutput()).toBe(`Permananet Address :${permanentAddress}`);
  });
});



