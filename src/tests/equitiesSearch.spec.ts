// tests/equitiesSearch.spec.ts
import { test, expect } from '@playwright/test';
import { EquitiesSearchPage } from '../main/pages/EquitiesSearchPage';

test.describe('Equities Search Page Tests', () => {
  let equitiesSearchPage: EquitiesSearchPage;

  test.beforeEach(async ({ page }) => {
    equitiesSearchPage = new EquitiesSearchPage(page);
    await equitiesSearchPage.navigate('https://www.medirect.com.mt/invest/equities/search');
  });

  test('Click Sign In Button', async () => {
    await equitiesSearchPage.signInButton().click();
    // Add assertions or further actions as needed
  });
});