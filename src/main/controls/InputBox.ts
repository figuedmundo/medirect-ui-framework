import { Page } from '@playwright/test';
import { Component } from './Component';
import { SelectorBy } from './SelectorBy';
import logger from "../utils/Logger";

export class InputBox extends Component {

    constructor(page: Page, selectorBy: SelectorBy, selector: string, description?: string) {
        super(page, selectorBy, selector, description, "Input TextBox");
    }

    async type(text: string) {
        logger.info(`Type "${text}" into ${this.description} ${this.componentType}`);
        await this.locator.fill(text);
    }
}
