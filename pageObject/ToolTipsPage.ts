import { expect, Page } from '@playwright/test';

export class ToolTipsPage {
  readonly page: Page;

  // Селекторы как свойства класса
  readonly toolTipButton = '#toolTipButton';
  readonly toolTipTextField = '#toolTipTextField';
  readonly firstLink = '#texToolTopContainer > a:nth-child(1)';
  readonly secondLink = '#texToolTopContainer > a:nth-child(2)';

  constructor(page: Page) {
    this.page = page;
  }

  async expectTooltipVisibleWithTextOn(selector: string, expectedText: string, timeout = 10000) {
    await this.page.locator(selector).hover();
    const tooltipWithText = this.page.locator('.tooltip-inner', { hasText: expectedText });
    await tooltipWithText.waitFor({ state: 'visible', timeout });
    await expect(tooltipWithText).toBeVisible();
    await expect(tooltipWithText).toHaveText(expectedText);
  }
}
