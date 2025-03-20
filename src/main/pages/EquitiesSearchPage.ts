import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { SelectorBy } from '../controls/SelectorBy';
import {ResultList} from "../controls/ResultList";
import {InputBox} from "../controls/InputBox";

export class EquitiesSearchPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // Result list of the Equities Search Page
  resultList(): ResultList {
    return new ResultList(this.page, SelectorBy.CSS, "table.me-tbl", "Equities");
  }

  // Search box
  searchBox(): InputBox {
    return new InputBox(this.page, SelectorBy.CSS, "input[placeholder*='Enter']", "Search Box");
  }
}
