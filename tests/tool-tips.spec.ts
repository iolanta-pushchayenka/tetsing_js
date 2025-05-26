import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../pages/ToolTipsPage';

test.describe('Tool Tips Page Tests', () => {
  test('Verify tooltips appear on hover', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.navigate();

    // Наводим на кнопку и проверяем тултип
    await toolTipsPage.hoverOnButton();
    await expect(page.locator('.tooltip-inner')).toHaveCount(1);
    const tooltip = page.locator('.tooltip-inner').last();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('You hovered over the Button');

    // Наводим на поле ввода и проверяем тултип
    await toolTipsPage.hoverOnInput();
    await expect(page.locator('.tooltip-inner')).toHaveCount(1);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('You hovered over the text field');

    // Наводим на текст "Contrary" и проверяем тултип
    await toolTipsPage.hoverOnText();
    await expect(page.locator('.tooltip-inner')).toHaveCount(1);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText('You hovered over the Contrary');
  });
});  