// src/pages/EquitiesSearchPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { Button } from '../controls/Button';
import { SelectorBy } from '../controls/SelectorBy';

export class EquitiesSearchPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // Method to return a Button instance for the Sign In button
  signInButton(): Button {
    return new Button(this.page, SelectorBy.XPATH, "//button[./span[contains(text(),'Sign In')]]", "Sign In");
  }
}
