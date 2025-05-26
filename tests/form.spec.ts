import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FormPage } from '../pages/FormPage';

test('Fill and submit form with faker data', async ({ page }) => {
  const formPage = new FormPage(page);

  faker.string.numeric(10)

  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement([1, 2, 3]), // 1=Male, 2=Female, 3=Other
    mobile: faker.string.numeric(10),
  // 10-digit phone number
  };

  await formPage.navigate();
  await formPage.fillBasicInfo(user);
  await formPage.submitForm();
  await formPage.checkModal(user);
});

