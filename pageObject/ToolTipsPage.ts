import { Page, Locator, expect } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;
  readonly button: Locator;
  readonly inputField: Locator;
  readonly contraryText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.locator('#toolTipButton');
    this.inputField = page.locator('#toolTipTextField');
    this.contraryText = page.locator('text=Contrary');
  }

  async navigate() {
    await this.page.goto('https://demoqa.com/tool-tips');
  }

  async hoverOnButton() {
    await this.button.hover();
  }

  async hoverOnInput() {
    await this.inputField.hover();
  }

  async hoverOnText() {
    await this.contraryText.hover();
  }

  async expectTooltipVisibleWithText(expectedText: string, timeout = 10000) {
    await this.page.waitForSelector(`.tooltip-inner:has-text("${expectedText}")`, { state: 'visible', timeout });
    const tooltipWithText = this.page.locator('.tooltip-inner', { hasText: expectedText });
    await tooltipWithText.waitFor({ state: 'visible', timeout });
    await expect(tooltipWithText).toBeVisible();
    await expect(tooltipWithText).toHaveText(expectedText);
  }
}