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
    await this.page.goto('https://demoqa.com/tool-tips', { timeout: 60000, waitUntil: 'domcontentloaded' });
  }

  async hoverOnButton() {
    await expect(this.button).toBeVisible();
    await this.button.hover();
  }

  async hoverOnInput() {
    await this.inputField.hover();
  }

  async hoverOnText() {
    await this.contraryText.hover();
  }

  async expectTooltipVisibleWithText(expectedText: string, timeout = 10000) {
    const tooltipLocator = this.page.locator('.tooltip-inner', { hasText: expectedText });
 
    await this.page.waitForTimeout(500); 
  
    await expect(tooltipLocator).toBeVisible({ timeout });
  
    await expect(tooltipLocator).toHaveText(expectedText);
  }
}