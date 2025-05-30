import { test } from '@playwright/test';
import { ToolTipsPage } from '../pageObject/ToolTipsPage';

test.describe('Tool Tips Page Tests', () => {
  test('Verify tooltips appear on hover', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);
    await page.goto('https://your-site-url.com/tooltips');

    // Массив с ожидаемыми текстами и селекторами из pageObject
    const tooltipsData = [
      { selector: toolTipsPage.toolTipButton, expectedText: 'Tooltip for button' },
      { selector: toolTipsPage.toolTipTextField, expectedText: 'Tooltip for text field' },
      { selector: toolTipsPage.firstLink, expectedText: 'Tooltip for first link' },
      { selector: toolTipsPage.secondLink, expectedText: 'Tooltip for second link' },
    ];

    for (const { selector, expectedText } of tooltipsData) {
      await toolTipsPage.expectTooltipVisibleWithTextOn(selector, expectedText);
    }
  });
});

