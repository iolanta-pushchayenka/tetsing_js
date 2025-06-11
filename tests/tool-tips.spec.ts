import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../pageObject/ToolTipsPage';

type TooltipTestData = {
  description: string;
  hoverMethod: 'hoverOnButton' | 'hoverOnInput' | 'hoverOnText';
  expectedText: string;
};

const tooltipTestCases: TooltipTestData[] = [
  {
    description: 'button tooltip',
    hoverMethod: 'hoverOnButton',
    expectedText: 'You hovered over the Button',
  },
  {
    description: 'input tooltip',
    hoverMethod: 'hoverOnInput',
    expectedText: 'You hovered over the text field',
  },
  {
    description: 'text tooltip',
    hoverMethod: 'hoverOnText',
    expectedText: 'You hovered over the Contrary',
  },
];

test.describe('Tool Tips Page Tests', () => {
  for (const { description, hoverMethod, expectedText } of tooltipTestCases) {
    test(`Verify tooltip appears on hover: ${description}`, async ({ page }) => {
      const toolTipsPage = new ToolTipsPage(page);
      await toolTipsPage.navigate();

      await toolTipsPage[hoverMethod]();
      await toolTipsPage.waitForTooltipText(expectedText);
      const tooltipText = await toolTipsPage.getTooltipText();

      expect(tooltipText).toBe(expectedText);
    });
  }
});

