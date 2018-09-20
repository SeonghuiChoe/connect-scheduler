import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})

export class dayPage {
  selectMonth = '';

  constructor() {
    let now = moment();
    this.selectMonth = now.format('MMMM YYYY');
  }
}
