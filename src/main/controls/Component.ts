import { expect, Locator, Page } from "@playwright/test";
import { SelectorBy } from "./SelectorBy";
import logger from "../utils/Logger";

export class Component {
  protected page: Page;
  protected selectorBy: SelectorBy;
  protected selector: string;
  protected locator: Locator;
  protected description?: string;
  protected componentType?: string;

  constructor(
    page: Page,
    selectorBy: SelectorBy,
    selector: string,
    description?: string,
    componentType?: string
  ) {
    this.page = page;
    this.selectorBy = selectorBy;
    this.selector = selector;
    this.description = description;
    this.locator = this.getLocator();
    this.componentType = componentType;
  }

  private by(selectorBy: SelectorBy, selector: string): string {
    switch (selectorBy) {
      case SelectorBy.ID:
        return `#${selector}`;
      case SelectorBy.CSS:
        return selector;
      case SelectorBy.XPATH:
        return `xpath=${selector}`;
      case SelectorBy.TAG_NAME:
        return `//${selector}`;
      case SelectorBy.LINK_TEXT:
        return `a:has-text("${selector}")`;
      case SelectorBy.NAME:
        return `[name="${selector}"]`;
      case SelectorBy.CLASS_NAME:
        return `.${selector}`;
      default:
        return selector;
    }
  }

  public getLocator(): Locator {
    try {
      return this.page.locator(this.by(this.selectorBy, this.selector));
    } catch (error) {
      throw new Error(
        `Locator not found: ${this.selectorBy} -> ${this.selector}\nError: ${error}`
      );
    }
  }

  async click() {
    logger.info(`Clicking on ${this.description} ${this.componentType?? 'component'}`);
    await this.locator.click();
  }

  async hover() {
    logger.info(`Hovering on ${this.description} ${this.componentType}`);
    await this.locator.hover();
  }

  async isVisible(): Promise<boolean> {
      logger.info(`Checking if ${this.description} ${this.componentType} is visible`);
      return await this.locator.isVisible();
  }

  async getText(): Promise<string> {
      logger.info(`Get text from ${this.description} ${this.componentType}`);
      return await this.locator.innerText();
  }

  async assertContainsText(expectedText: string) {
    logger.info(`Asserting ${this.description} ${this.componentType} contains [${expectedText}]`);
    await expect(
        this.getLocator(),
        `${this.description} ${this.componentType} should contains [${expectedText}] but found [${await this.getText()}]`
    ).toContainText(expectedText);
  }

  async assertHaveText(expectedText: string) {
    logger.info(`Asserting ${this.description} ${this.componentType} have [${expectedText}]`);
    await expect(
        this.getLocator(),
        `${this.description} ${this.componentType} should have [${expectedText}] but found [${await this.getText()}]`
    ).toHaveText(expectedText);
  }

  async assertIsNotVisible() {
    logger.info(`Asserting ${this.description} ${this.componentType} is not visible`);
    await expect(
        this.getLocator(),
        `${this.description} ${this.componentType} should not be visible but found`
    ).not.toBeVisible();
  }

  async assertIsVisible() {
    logger.info(`Asserting ${this.description} ${this.componentType} is visible`);
    await expect(
        this.locator,
        `${this.description} ${this.componentType} should visible but not found in the page`
    ).toBeVisible();
  }
}
