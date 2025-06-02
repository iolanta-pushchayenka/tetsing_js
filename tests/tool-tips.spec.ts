import { test } from '@playwright/test';
import { ToolTipsPage } from '../pageObject/ToolTipsPage';

test.describe('Tool Tips Page Tests', () => {
  test('Verify tooltips appear on hover', async ({ page }) => {
    const toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.navigate();

    await toolTipsPage.hoverOnButton();
    await toolTipsPage.expectTooltipVisibleWithText('You hovered over the Button');

    await toolTipsPage.hoverOnInput();
    await toolTipsPage.expectTooltipVisibleWithText('You hovered over the text field');

    await toolTipsPage.hoverOnText();
    await toolTipsPage.expectTooltipVisibleWithText('You hovered over the Contrary');
  });
}); 

