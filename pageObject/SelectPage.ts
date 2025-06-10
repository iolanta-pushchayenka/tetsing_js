import { Page, Locator } from '@playwright/test';

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
    this.multiSelectValues = page.locator('#selectMenuContainer [class*="multiValue"]');
  
    
    this.menu = page.locator('.css-26l3qy-menu'); 
  
    this.selectValueSingleValue = this.selectValueDropdown.locator('[class*="singleValue"]');
    this.selectOneSingleValue = this.selectOneDropdown.locator('[class*="singleValue"]');
    this.oldSelectMenuSelectedOption = this.oldSelectMenuDropdown.locator('option:checked');
    this.oldSelectMenuOptionByText = (text: string) =>
      this.oldSelectMenuDropdown.locator('option', { hasText: text });
    this.menuOptionByText = (text: string) => this.menu.locator(`text=${text}`);
  }
  
  async goto() {
    await this.page.goto('https://demoqa.com/select-menu', { waitUntil: 'domcontentloaded' });
  }

  async selectFromSelectValue(optionText: string) {
    await this.selectValueDropdown.click();
    await this.menuOptionByText(optionText).click();
  }

  async getSelectedSelectValue() {
    const text = await this.selectValueSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromSelectOne(optionText: string) {
    await this.selectOneDropdown.click();
    await this.menuOptionByText(optionText).click();
  }

  async getSelectedSelectOneValue() {
    const text = await this.selectOneSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromOldSelectMenuByText(optionText: string) {
    const option = this.oldSelectMenuOptionByText(optionText);
    const value = await option.evaluate(el => (el as HTMLOptionElement)?.value);
    if (!value) throw new Error(`Option "${optionText}" not found`);
    await this.oldSelectMenuDropdown.selectOption(value);
  }

  async getSelectedOldSelectMenuValue() {
    const text = await this.oldSelectMenuSelectedOption.textContent();
    return text?.trim() ?? '';
  }

  async selectFromMultiSelectDropDown(options: string[]) {
    for (const optionText of options) {
      await this.multiSelectInput.fill(optionText);
      await this.menuOptionByText(optionText).click();
    }
  }

  async getSelectedMultiSelectDropDownValues() {
    return (await this.multiSelectValues.allTextContents()).map((v) => v.trim());
  }

  async selectMultipleCars(options: string[]) {
    await this.carsDropdown.selectOption(options);
  }

  async getSelectedCarsValues() {
    const selected = await this.carsDropdown.locator('option:checked').allTextContents();
    return selected.map(v => v.trim());
  }
}
