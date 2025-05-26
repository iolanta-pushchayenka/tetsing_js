import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage';
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

    const outputSelector = '#output';
    await expect(page.locator(outputSelector)).toBeVisible();

    await expect(page.locator('#output #name')).toHaveText(`Name:${name}`);
    await expect(page.locator('#output #email')).toHaveText(`Email:${email}`);
    await expect(page.locator('#output #currentAddress')).toHaveText(`Current Address :${currentAddress}`);
    await expect(page.locator('#output #permanentAddress')).toHaveText(`Permananet Address :${permanentAddress}`);
  });
});

