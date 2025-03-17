// src/pages/BasePage.ts
import { Page } from '@playwright/test';
import { Logger } from '../utils/Logger';

export class BasePage {
    protected page: Page;
    protected logger: Logger;

    constructor(page: Page) {
        this.page = page;
        this.logger = new Logger();
    }

    async navigate(url: string) {
        this.logger.log(`Navigating to ${url}`);
        await this.page.goto(url);
    }

    async waitForElement(locator: string) {
        this.logger.log(`Waiting for element: ${locator}`);
        await this.page.waitForSelector(locator);
    }
}
