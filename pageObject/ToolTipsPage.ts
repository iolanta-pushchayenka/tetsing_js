import { Page, Locator } from '@playwright/test';

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
    await this.button.hover();
  }

  async hoverOnInput() {
    await this.inputField.hover();
  }

  async hoverOnText() {
    await this.contraryText.hover();
  }

  async waitForTooltipText(expectedText: string) {
    await this.page.waitForFunction(
      (text) => {
        const tooltip = document.querySelector('.tooltip-inner');
        return tooltip?.textContent === text;
      },
      expectedText
    );
  }
  
  

  async getTooltipText() {
    return await this.tooltipText.textContent();
  }
}