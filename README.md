# Practice 3. UI Testing

This homework project involves implementing UI tests using [Playwright](https://playwright.dev) for the demo website  
[https://demoqa.com](https://demoqa.com). The project is structured following the **Page Object Model (POM)**.  
It includes **cross-browser** and **parallel test execution**, **HTML report generation**, and **automatic screenshots** on failures.

---

## Implemented Test Scenarios

- **Alerts** — Verifies all 4 types of alerts  
  *(POM: `AlertsPage.ts`, Test: `alerts.spec.ts`)*

- **Automation Practice Form** — Fills in required form fields  
  *(POM: `FormPage.ts`, Test: `form.spec.ts`)*

- **Text Box** — Fills in text fields with random values  
  *(POM: `TextBoxPage.ts`, Test: `text-box.spec.ts`)*

- **Tool Tips** — Verifies tooltip display on hover  
  *(POM: `ToolTipsPage.ts`, Test: `tool-tips.spec.ts`)*

- **Select Menu** — Works with dropdowns and multi-select inputs  
  *(POM: `SelectPage.ts`, Test: `select-menu.spec.ts`)*

---

## Installation and Execution

### 1. Install dependencies:

```bash
npm install
```

### 2. Run test:

```bash
npx playwright test --workers=1
```

### 3. Open HTML report:


```bash
npx playwright show-report
```

