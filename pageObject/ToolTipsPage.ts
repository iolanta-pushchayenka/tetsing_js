import { Page, Locator, expect } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;
  readonly button: Locator;
  readonly inputField: Locator;
  readonly contraryText: Locator;
  readonly tooltipText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.locator('#toolTipButton');
    this.inputField = page.locator('#toolTipTextField');
    this.contraryText = page.locator('text=Contrary');
    this.tooltipText = page.locator('.tooltip-inner');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/tool-tips', {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });
  }

  async hoverOnButton() {
    await expect(this.button).toBeVisible();
    await this.button.hover();
  }

  async hoverOnInput() {
    await expect(this.inputField).toBeVisible();
    await this.inputField.hover();
  }

  async hoverOnText() {
    await expect(this.contraryText).toBeVisible();
    await this.contraryText.hover();
  }
//TODO remove locator to the constructor
  async expectTooltipVisibleWithText(expectedText: string) {
   await this.page.waitForSelector('.tooltip-inner', { state: 'visible' });

    const tooltipLocator = this.tooltipText.filter({ hasText: expectedText });
    await expect(tooltipLocator).toBeVisible();
    await expect(tooltipLocator).toHaveText(expectedText);
  }
}
