import {Page, expect} from '@playwright/test';
import {BasePage} from "./BasePage";
import {TextBox} from "../controls/TextBox";
import {SelectorBy} from "../controls/SelectorBy";
import {Component} from "../controls/Component";
import logger from "../utils/Logger";

export class EquityDetailsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  title(): TextBox {
    return new TextBox(this.page, SelectorBy.CSS, "h2.text", "Title");
  }

  becomeACustomerWidget(): Component {
    return new Component(this.page, SelectorBy.XPATH, "//div[contains(@class, 'elementor-widget-wrap')]//section[contains(.,'Do you want to start using the full functionality for FREE?')]", "Become a customer widget");
  }

  priceBox(): TextBox {
    return new TextBox(this.page, SelectorBy.XPATH, "//div[contains(text(), 'USD')]", "Price");
  }

  async assertChartIsBlurred() {
    logger.info("Asserting chart is blurred");
    await expect(await this.page.locator("img[src*='chart-blurred.png']")).toBeVisible();
  }
}
