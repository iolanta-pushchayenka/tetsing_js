import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pageObject/SelectPage';

const selectMenuTestCases = [
  {
    description: 'Select Value: Group 2, option 1',
    selectMethod: 'selectFromSelectValue',
    getValueMethod: 'getSelectedSelectValue',
    expected: 'Group 2, option 1',
  },
  {
    description: 'Select One: Other',
    selectMethod: 'selectFromSelectOne',
    getValueMethod: 'getSelectedSelectOneValue',
    expected: 'Other',
  },
  {
    description: 'Old Select Menu: Green',
    selectMethod: 'selectFromOldSelectMenuByText',
    getValueMethod: 'getSelectedOldSelectMenuValue',
    expected: 'Green',
  },
];

const multiSelectOptions = ['Black', 'Blue'];
const carSelectOptions = ['volvo', 'audi'];
const expectedCarLabels = ['Volvo', 'Audi'];

test.describe('Select Menu Tests', () => {
  test('Verify dropdowns using clean POM structure', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto();

    for (const { description, selectMethod, getValueMethod, expected } of selectMenuTestCases) {
      await selectMenuPage[selectMethod](expected);
      const actual = await selectMenuPage[getValueMethod]();
      expect(actual).toBe(expected);
    }

    await selectMenuPage.selectFromMultiSelectDropDown(multiSelectOptions);
    const selectedMulti = await selectMenuPage.getSelectedMultiSelectDropDownValues();
    for (const color of multiSelectOptions) {
      expect(selectedMulti).toContain(color);
    }

    await selectMenuPage.selectMultipleCars(carSelectOptions);
    const selectedCars = await selectMenuPage.getSelectedCarsValues();
    expect(selectedCars).toEqual(expect.arrayContaining(expectedCarLabels));
  });
});