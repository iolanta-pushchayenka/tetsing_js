import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectPage';

test.describe('Select Menu Tests', () => {
  test('Cover functionality with dropdowns', async ({ page }) => {
    const selectMenuPage = new SelectMenuPage(page);
    await page.goto('https://demoqa.com/select-menu');

    // Select Value: Group 2, option 1
    await selectMenuPage.selectFromSelectValue('Group 2, option 1');
    const selectedValue = await selectMenuPage.getSelectedSelectValue();
    expect(selectedValue?.trim()).toBe('Group 2, option 1');

    // Select One: Other
    await selectMenuPage.selectFromSelectOne('Other');
    const selectedOne = await selectMenuPage.getSelectedSelectOneValue();
    expect(selectedOne?.trim()).toBe('Other');

    // Old Style Select Menu: Green
    await selectMenuPage.selectFromOldSelectMenuByText('Green');
    const selectedOld = await selectMenuPage.getSelectedOldSelectMenuValue();
    expect(selectedOld?.trim()).toBe('Green');

    // Multiselect Drop Down: Black, Blue
    await selectMenuPage.selectFromMultiSelectDropDown(['Black', 'Blue']);
    const selectedMulti = await selectMenuPage.getSelectedMultiSelectDropDownValues();
    expect(selectedMulti).toContain('Black');
    expect(selectedMulti).toContain('Blue');
  });
});
