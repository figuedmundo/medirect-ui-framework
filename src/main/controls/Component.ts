// src/controls/Component.ts
import { Locator, Page } from '@playwright/test';
import { SelectorBy } from './SelectorBy';

export class Component {
    protected page: Page;
    protected selectorBy: SelectorBy;
    protected selector: string;
    protected locator: Locator;

    constructor(page: Page, selectorBy: SelectorBy, selector: string, description?: string) {
        this.page = page;
        this.selectorBy = selectorBy;
        this.selector = selector;
        this.locator = this.getLocator();
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
            const locatorString = this.by(this.selectorBy, this.selector);
            return this.page.locator(locatorString).first();
        } catch (error) {
            throw new Error(`Locator not found: ${this.selectorBy} -> ${this.selector}\nError: ${error}`);
        }
    }

    async click() {
        await this.locator.click();
    }

    async isVisible(): Promise<boolean> {
        return await this.locator.isVisible();
    }

    async getText(): Promise<string> {
        return await this.locator.innerText();
    }
}
