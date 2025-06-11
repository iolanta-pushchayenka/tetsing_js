# Practice 3. UI Testing

Automating UI testing of a website [demoqa.com ](https://demoqa.com /) using **Playwright**.

---

## The purpose of the project

This project is designed to automate testing of the user interface of the following pages:

- [Alerts](https://demoqa.com/alerts ) — checking all types of alerts.
- [Practice Form](https://demoqa.com/automation-practice-form ) — filling in the required fields and checking the result.
- [Text Box](https://demoqa.com/text-box ) — filling out the form with random data and checking the output.
- [Tool Tips](https://demoqa.com/tool-tips ) — pointing at elements and checking the text of tooltips.
- [Select Menu](https://demoqa.com/select-menu ) — select options from all available lists.

---

## Technologies used

- Playwright
- Faker
- TypeScript
- GitHub Actions — CI/CD
- Playwright HTML Report 
- Screenshots for errors

---

## Project structure

```bash
.
├── PageObject/ # Page Object Model (POM)
├── tests/ # Test scenarios
├── playwright-report/ # Automatically generated reports after launch
├── playwright.config.ts
└── README.md # Project documentation

```



## Installation

Clone a repository:

```bash
git clone https://github.com/iolanta-pushchayenka/tetsing_js.git
cd tetsing_js

```

Install Dependencies:

```bash
npm install

```
## Running tests

Running all the tests:

```bash

npx playwright test tests
```

Running a separate test:

```bash

npx playwright test tests/alerts.spec.ts
npx playwright test tests/form.spec.ts
npx playwright test tests/text-box.spec.ts
npx playwright test tests/tool-tips.spec.ts
npx playwright test tests/select-menu.spec.ts
```


Running tests by keyword and screen resolution:

```bash

npm run test -- --grep "alert" --project="Chromium 1920x1080"
npm run test -- --grep "alert" --project="Firefox 1366x768"

npm run test -- --grep "submit form" --project="Chromium 1920x1080"
npm run test -- --grep "submit form" --project="Firefox 1366x768"

npm run test -- --grep "Cover functionality" --project="Chromium 1920x1080"
npm run test -- --grep "Cover functionality" --project="Firefox 1366x768"

npm run test -- --grep "Fill form" --project="Chromium 1920x1080"
npm run test -- --grep "Fill form" --project="Firefox 1366x768"

npm run test -- --grep "Verify tooltips" --project="Chromium 1920x1080"
npm run test -- --grep "Verify tooltips" --project="Firefox 1366x768"

```

## Reports

After running the tests:

- The results can be found in the playwright-report folder.

- Screenshots are automatically saved when the tests crash.

### Open the HTML report:

```bash
npx playwright show-report