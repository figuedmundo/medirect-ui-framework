import { test } from '@playwright/test';
import { EquitiesSearchPage } from '../main/pages/EquitiesSearchPage';
import { HomePage } from "../main/pages/HomePage";
import {SiteNavigation} from "../main/pages/SiteNavigation";
import {EquityDetailsPage} from "../main/pages/EquityDetailsPage";
import {Utils} from "../main/utils/Utils";

test.describe('Equities Search Page Tests', () => {
  let homePage: HomePage;
  let siteNavigation: SiteNavigation;
  let equitiesSearchPage: EquitiesSearchPage;
  let equityDetailsPage: EquityDetailsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    siteNavigation = new SiteNavigation(page);
    equitiesSearchPage = new EquitiesSearchPage(page);
    equityDetailsPage = new EquityDetailsPage(page);

    await homePage.navigate();
    await homePage.acceptCookiesButton().click();
    await homePage.cookiesBox().assertIsNotVisible()

    // Navigate to the Equities page once for all tests
    await siteNavigation.navigate('Invest', 'Equities');
  });

  test('Verify that navigating to Invest > Equities displays the correct page', async () => {
    await equitiesSearchPage.title().assertHaveText("Invest in Equities");
  });

  test('Verify that Equities list is visible', async () => {
    await equitiesSearchPage.resultList().assertIsVisible();
  });

  test('Verify that the Equities "1-800-Flowers.com Inc" and "111 Inc" are displayed in the list by default', async () => {
    let expectedResults = ["1-800-Flowers.com Inc", "111 Inc"];
    await equitiesSearchPage.resultList().assertListContains(expectedResults);
  });

  test('Search for a valid Equity and verify the equity is shown in the list', async () => {
    let expectedEquity = "Uber";

    await equitiesSearchPage.searchBox().type(expectedEquity);
    await equitiesSearchPage.resultList().assertRowToBeVisible(expectedEquity);
  })

  test('Search for an invalid Equity and verify the list is empty', async () => {
    let expectedEquity = Utils.randomString(10);

    await equitiesSearchPage.searchBox().type(expectedEquity);
    await equitiesSearchPage.resultList().assertRowToNotBeVisible(expectedEquity);
    await equitiesSearchPage.resultList().assertRowsToHaveCount(0);
  })

  test('Verify that clicking "More Information" for an equity displays the correct details', async () => {
    let equity = "Uber";

    await equitiesSearchPage.searchBox().type(equity);
    await equitiesSearchPage.resultList().clickMoreInformationOfRow(equity);

    await equityDetailsPage.title().assertContainsText("Uber");
  })

  test('Ensure detailed security details are not visible to the public', async () => {
    let equity = "Uber";

    await equitiesSearchPage.searchBox().type(equity);
    await equitiesSearchPage.resultList().clickMoreInformationOfRow(equity);

    await equityDetailsPage.becomeACustomerWidget().assertIsVisible();
    await equityDetailsPage.becomeACustomerWidget().assertContainsText("Do you want to start using the full functionality for FREE?")
    await equityDetailsPage.priceBox().assertContainsText("🔒");
    await equityDetailsPage.assertChartIsBlurred();
  })
});