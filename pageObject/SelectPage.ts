import { Page, Locator, expect } from '@playwright/test';

export class SelectMenuPage {
  private selectValueDropdown: Locator;
  private selectOneDropdown: Locator;
  private oldSelectMenuDropdown: Locator;
  private carsDropdown: Locator;
  private multiSelectInput: Locator;
  private multiSelectValues: Locator;
  private menu: Locator;

  private selectValueSingleValue: Locator;
  private selectOneSingleValue: Locator;
  private oldSelectMenuSelectedOption: Locator;
  private oldSelectMenuOptionByText: (text: string) => Locator;
  private menuOptionByText: (text: string) => Locator;

  constructor(private page: Page) {
    this.selectValueDropdown = page.locator('#withOptGroup');
    this.selectOneDropdown = page.locator('#selectOne');
    this.oldSelectMenuDropdown = page.locator('#oldSelectMenu');
    this.carsDropdown = page.locator('#cars');
    this.multiSelectInput = page.locator('#react-select-4-input');
    this.multiSelectValues = page.locator('.css-1rhbuit-multiValue .css-12jo7m5');
    this.menu = page.locator('.css-26l3qy-menu');

    this.selectValueSingleValue = this.selectValueDropdown.locator('[class*="singleValue"]');
    this.selectOneSingleValue = this.selectOneDropdown.locator('[class*="singleValue"]');
    this.oldSelectMenuSelectedOption = this.oldSelectMenuDropdown.locator('option:checked');
    this.oldSelectMenuOptionByText = (text: string) =>
      this.oldSelectMenuDropdown.locator('option', { hasText: text });
    this.menuOptionByText = (text: string) => this.menu.locator(`text=${text}`);
  }

  async goto() {
    await this.page.goto('https://demoqa.com/select-menu', {waitUntil: 'domcontentloaded' }); 
  }


  async selectFromSelectValue(optionText: string) {
    await expect(this.selectValueDropdown).toBeVisible();
    await this.selectValueDropdown.click();

    const option = this.menuOptionByText(optionText);
    await expect(option).toBeVisible();
    await option.click();
  }

  async getSelectedSelectValue() {
    const text = await this.selectValueSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromSelectOne(optionText: string) {
    await expect(this.selectOneDropdown).toBeVisible();
    await this.selectOneDropdown.click();

    const option = this.menuOptionByText(optionText);
    await expect(option).toBeVisible();
    await option.click();
  }

  async getSelectedSelectOneValue() {
    const text = await this.selectOneSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromOldSelectMenuByText(optionText: string) {
    await expect(this.oldSelectMenuDropdown).toBeVisible();
    const option = this.oldSelectMenuOptionByText(optionText);
    const value = await option.evaluate(
      (el: Element | null) => (el as HTMLOptionElement)?.value
    );
    if (!value) throw new Error(`Option with text "${optionText}" not found`);
    await this.oldSelectMenuDropdown.selectOption(value);
  }

  async getSelectedOldSelectMenuValue() {
    const text = await this.oldSelectMenuSelectedOption.textContent();
    return text?.trim() ?? '';
  }

  async selectFromMultiSelectDropDown(options: string[]) {
    for (const optionText of options) {
      await expect(this.multiSelectInput).toBeVisible();
      await this.multiSelectInput.fill(optionText);
      const option = this.menuOptionByText(optionText);
      await expect(option).toBeVisible();
      await option.click();
    }
  }

  async getSelectedMultiSelectDropDownValues() {
    return (await this.multiSelectValues.allTextContents()).map((v) => v.trim());
  }

  async selectMultipleCars(options: string[]) {
    await expect(this.carsDropdown).toBeVisible();
    for (const option of options) {
      const carOption = this.carsDropdown.locator(`option[value="${option}"]`);
      await expect(carOption).toBeVisible();
    }
    await this.carsDropdown.selectOption(options);
  }

  async getSelectedCarsValues() {
    const selectedOptions = await this.carsDropdown.locator('option:checked').allTextContents();
    return selectedOptions.map((v) => v.trim());
  }
}

