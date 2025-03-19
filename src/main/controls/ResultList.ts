import {expect, Page} from '@playwright/test';
import { Component } from './Component';
import { SelectorBy } from './SelectorBy';
import logger from "../utils/Logger";

export class ResultList extends Component {

    constructor(page: Page, selectorBy: SelectorBy, selector: string, description?: string) {
        super(page, selectorBy, selector, description, "Result List");
    }


    // Get component row by text
    async getRowByInnerText(text: string) {
        return this.getLocator().locator(`//tr[contains(@class, 'me-tbl-row')][.//p[contains(text(), '${text}')]]`);
    }

    async getRows() {
        return this.getLocator().locator(`//tr[contains(@class, 'me-tbl-row')]`);
    }

    async clickMoreInformationOfRow(text: string) {
        let row = await this.getRowByInnerText(text);
        await row.locator('//button[contains(text(), "More information")]').click();
    }

    // Assert the result list contains a expected list
    async assertListContains(expectedList: string[]) {
        logger.info(`Assert ${this.description} ${this.componentType} contains ${expectedList}`);
        //  get rows by inner text and assert it exist using the expected list
        const rows = await Promise.all(expectedList.map(async (text) => {
            return this.getRowByInnerText(text);
        }));
        expect(rows).toHaveLength(expectedList.length);
    }

    // Assert row exist in the list
    async assertRowToBeVisible(expectedEquity: string) {
        logger.info(`Assert row that contains ${expectedEquity} is visible`);
        await expect(await this.getRowByInnerText(expectedEquity)).toBeVisible();
    }

    async assertRowToNotBeVisible(expectedEquity: string) {
        logger.info(`Assert row that contains ${expectedEquity} is not visible`);
        await expect(await this.getRowByInnerText(expectedEquity)).not.toBeVisible();
    }

    async assertRowsToHaveCount(count: number) {
        logger.info(`Assert ${this.description} ${this.componentType} has ${count} rows`);
        await expect(await this.getRows()).toHaveCount(count);
    }
}
