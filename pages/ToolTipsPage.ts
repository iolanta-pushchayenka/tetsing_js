export class ToolTipsPage {
    constructor(public page) {}
  
    async navigate() {
      await this.page.goto('https://demoqa.com/tool-tips');
    }
  
    async hoverOnButton() {
      await this.page.hover('#toolTipButton');
    }
  
    async hoverOnInput() {
      await this.page.hover('#toolTipTextField');
    }
  
    async hoverOnText() {
      await this.page.hover('text=Contrary');
    }

    async getTooltipText() {
      return this.page.locator('.tooltip-inner').textContent();
    
    }    

}
  