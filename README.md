# Test Automation Framework

This project utilizes Playwright for test automation using TypeScript. Follow the steps below to set up the environment, install dependencies, configure the project, and execute the tests.

---

## Prerequisites

Before running the tests, ensure the following tools and dependencies are installed on your system:

1. **Node.js** (version 16 or higher)  
   - Download and install Node.js from [Node.js official website](https://nodejs.org/).

2. **Browser Dependencies**  
   - This framework uses Playwright, which automatically installs browsers required for testing. However, ensure your system supports Chromium, Firefox, and WebKit.

---

## Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/figuedmundo/medirect-ui-framework.git && cd medirect-ui-framework.git
   ```

2. **Install Dependencies**  
   Install all required packages using NPM:
   ```bash
   npm install
   ```
3. **Install Playwright Browsers**
```bash
npx playwright install
````

---
## Framework Design
The framework is organized using the Page Object Model (POM) pattern, which separates test logic from page-specific interactions. This design promotes reusability, maintainability, and readability.

### 1. Pages
   
Each page in the application (e.g., Home Page, Equities Search Page) is represented by a Page Object. These page objects:
- Know about the **controls or components** that belong to the page.

Example:
```typescript
export class EquitiesSearchPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    resultList(): ResultList {
        return new ResultList(this.page, SelectorBy.CSS, "table.me-tbl", "Equities");
    }

    searchBox(): InputBox {
        return new InputBox(this.page, SelectorBy.CSS, "input[placeholder*='Enter']", "Search Box");
    }
}
````
### 2. Controls
   
Controls or components are abstractions of the behavior of UI elements (e.g., buttons, text boxes, lists). They:
- Encapsulate actions and assertions for a specific UI element.
- Allow for fluent test syntax by delegating actions to the control itself.

Example:
```typescript
export class Button extends Component {
    constructor(page: Page, selectorBy: SelectorBy, selector: string, description?: string) {
        super(page, selectorBy, selector, description, "Button");
    }

    async click() {
        await super.click();
    }
}
````
### 3. Fluent Tests

By combining pages and controls, tests become fluent and readable. For example:

```typescript
await equitiesSearchPage.searchBox().type('Uber');
await equitiesSearchPage.resultList().assertRowToBeVisible('Uber');
````
This approach reduces code duplication and makes tests easier to write and maintain.

---

## Configuration

The project is configured using the `playwright.config.ts` file. Key configurations include:

- Browsers: Tests run on Chromium.
- Reporters: HTML and JSON reporters are enabled.
- Base URL: The base URL for the tests is set to https://www.medirect.com.mt.

You can modify these settings in the playwright.config.ts file if needed.

---

## Running Tests

- To execute all test cases:
   ```bash
   npx playwright test
   ```

---

## Viewing Test Reports

### HTML Report
After running the tests, an HTML report is generated. To view it, run:

  ```bash
  npx playwright show-report
  ```
This will open the report in your default browser.

### JSON Report
A JSON report is also generated and saved as test-results.json in the project root. 

---

## Test Structure
The tests are organized as follows:

- Page Objects: Located in src/main/pages/.
  - HomePage.ts
  - EquitiesSearchPage.ts
  - EquityDetailsPage.ts
  - SiteNavigation.ts
- Controls: Located in src/main/controls/.
  - Component.ts
  - Button.ts
  - InputBox.ts
  - TextBox.ts
  - ResultList.ts
  - SelectBy.ts
- Utils: Located in src/main/utils/.
  - Logger.ts
  - Utils.ts
- Tests: Located in src/tests/.
  - equities.spec.ts: Contains all test cases for the equities search page.


