import { Page } from '@playwright/test';
import { SelectorBy } from '../controls/SelectorBy';
import {Component} from "../controls/Component";

export class SiteNavigation {
  private readonly page: Page
  constructor(page: Page) {
    this.page = page;
  }

  // Method to navigate to an option
  topOption(option: string) {
    return new Component(this.page, SelectorBy.XPATH, `//*[@id='site-navigation']//a[./span[contains(text(), '${option}')]]`, option, "Navigation Option")
  }

  subOption(option: string) {
    return new Component(this.page, SelectorBy.XPATH, `//*[@id='site-navigation']//a[.//span[text()='${option}']]`, option, "Navigation Option")
  }

  async navigate(option: string, subOption?: string) {
    if (subOption) {
      await this.topOption(option).hover();
      await this.subOption(subOption).click();
    } else {
      await this.topOption(option).click();
    }
  }
}
