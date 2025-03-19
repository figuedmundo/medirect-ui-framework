import {Page} from '@playwright/test';
import {Button} from "../controls/Button";
import {SelectorBy} from "../controls/SelectorBy";
import {Component} from "../controls/Component";
import {TextBox} from "../controls/TextBox";

export class BasePage {
    protected page: Page;
    protected url?: string;


    constructor(page: Page, url?: string) {
        this.page = page;
        this.url = url;
    }

    async navigate() {
        if (this.url) {
            await this.page.goto(this.url);
        } else {
            throw new Error('URL not set');
        }
    }

    title(): TextBox {
        return new TextBox(this.page, SelectorBy.CSS, "h1.elementor-heading-title", "Title");
    }

    acceptCookiesButton(): Button {
        return new Button(this.page, SelectorBy.CSS, "div.iubenda-cs-container .iubenda-cs-accept-btn", "Accept cookies")
    }

    cookiesBox(): Component {
        return new Component(this.page, SelectorBy.CSS, "div.iubenda-cs-container", "Cookies box")
    }
}
