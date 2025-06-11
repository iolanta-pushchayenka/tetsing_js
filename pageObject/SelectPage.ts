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

    this.menu = page.locator('div[class*="-menu"]');
    this.menuOptionByText = (text: string) => this.menu.locator(`div[class*="-option"]:has-text("${text}")`);

    this.selectValueSingleValue = this.selectValueDropdown.locator('[class*="singleValue"]');
    this.selectOneSingleValue = this.selectOneDropdown.locator('[class*="singleValue"]');
    this.oldSelectMenuSelectedOption = this.oldSelectMenuDropdown.locator('option:checked');
    this.oldSelectMenuOptionByText = (text: string) =>
      this.oldSelectMenuDropdown.locator('option', { hasText: text });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://demoqa.com/select-menu', { waitUntil: 'domcontentloaded' });
  }

  async selectFromSelectValue(optionText: string): Promise<void> {
    await this.selectValueDropdown.waitFor({ state: 'visible' });
    await this.selectValueDropdown.click();
    const option = this.menuOptionByText(optionText);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async getSelectedSelectValue(): Promise<string> {
    const text = await this.selectValueSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromSelectOne(optionText: string): Promise<void> {
    await this.selectOneDropdown.waitFor({ state: 'visible' });
    await this.selectOneDropdown.click();
    const option = this.menuOptionByText(optionText);
    await option.waitFor({ state: 'visible' });
    await option.click();
  }

  async getSelectedSelectOneValue(): Promise<string> {
    const text = await this.selectOneSingleValue.textContent();
    return text?.trim() ?? '';
  }

  async selectFromOldSelectMenuByText(optionText: string): Promise<void> {
    const option = this.oldSelectMenuOptionByText(optionText);
    const value = await option.evaluate(el => (el as HTMLOptionElement)?.value);
    if (!value) throw new Error(`Option "${optionText}" not found`);
    await this.oldSelectMenuDropdown.waitFor({ state: 'visible' });
    await this.oldSelectMenuDropdown.selectOption(value);
  }

  async getSelectedOldSelectMenuValue(): Promise<string> {
    const text = await this.oldSelectMenuSelectedOption.textContent();
    return text?.trim() ?? '';
  }

  async selectFromMultiSelectDropDown(options: string[]): Promise<void> {
    for (const optionText of options) {
      await this.multiSelectInput.waitFor({ state: 'visible' });
      await this.multiSelectInput.fill(optionText);
      const option = this.menuOptionByText(optionText);
      await option.waitFor({ state: 'visible' });
      await option.click();
    }
  }

  async getSelectedMultiSelectDropDownValues(): Promise<string[]> {
    const texts = await this.multiSelectValues.allTextContents();
    return texts.map((v) => v.trim());
  }

  async selectMultipleCars(options: string[]): Promise<void> {
    await this.carsDropdown.waitFor({ state: 'visible' });
    await this.carsDropdown.selectOption(options);
  }

  async getSelectedCarsValues(): Promise<string[]> {
    const selected = await this.carsDropdown.locator('option:checked').allTextContents();
    return selected.map(v => v.trim());
  }
}
