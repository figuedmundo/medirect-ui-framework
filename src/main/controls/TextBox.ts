import { Page } from '@playwright/test';
import { Component } from './Component';
import { SelectorBy } from './SelectorBy';

export class TextBox extends Component {

    constructor(page: Page, selectorBy: SelectorBy, selector: string, description?: string) {
        super(page, selectorBy, selector, description, "TextBox");
    }
}
