import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FormPage } from '../pageObject/FormPage';

test('Submit form with faker-generated data', async ({ page }) => {
  const formPage = new FormPage(page);

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement([1, 2, 3]),
    mobile: faker.string.numeric(10),
  };

  await formPage.navigate();
  await formPage.fillBasicInfo(user);
  await formPage.submitForm();

  // Проверки (вынесены сюда)
  await expect(formPage.getModal()).toBeVisible();
  await expect(formPage.getModalHeader()).toHaveText('Thanks for submitting the form');

  const expectedFields = {
    'Student Name': `${user.firstName} ${user.lastName}`,
    'Student Email': user.email,
    Gender: user.gender === 1 ? 'Male' : user.gender === 2 ? 'Female' : 'Other',
    Mobile: user.mobile,
  };

  for (const [label, expectedValue] of Object.entries(expectedFields)) {
    const cell = formPage.getModalValue(label);
    await expect(cell).toHaveText(expectedValue);
  }
});
