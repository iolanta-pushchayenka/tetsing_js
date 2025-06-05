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
```

# Review
* Remove russian language from 
* It has been observed that there is inconsistency in the structure of the tests. While some validations and assertions are implemented within the Page Object Model (POM), others are directly written in the test files. This inconsistency can lead to confusion, reduced maintainability, and difficulty in scaling the test suite.
* The tests are not parameterized, which limits their flexibility and reusability. For example, hardcoding values such as window sizes or test data can lead to duplication and make the tests harder to adapt to different scenarios or environments.
* Parallel execution is not properly configured, which means the tests are not utilizing the full potential of Playwright’s parallelism. This could lead to longer test execution times and reduced efficiency.
* Hardcoding window sizes in the tests reduces flexibility and makes it harder to test responsiveness across different screen sizes.
