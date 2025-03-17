import { Page, Locator } from '@playwright/test';

export class EquityDetailsPage {
  private page: Page;
  private securityDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.securityDetails = page.locator('.security-details');
  }

  async areSecurityDetailsVisible() {
    return await this.securityDetails.isVisible();
  }
}
