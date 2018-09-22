import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})

export class dayPage {
  /**
   * 선택된 날짜
   */
  currentDate = moment(new Date());

  weekdays = [
    {name: 'Sun', isWeekend: true},
    {name: 'Mon', isWeekend: false},
    {name: 'Tue', isWeekend: false},
    {name: 'Wed', isWeekend: false},
    {name: 'Thu', isWeekend: false},
    {name: 'Fri', isWeekend: false},
    {name: 'Sat', isWeekend: true}
  ];

  constructor() {}

  goPreMonth() {
    this.currentDate = this.currentDate.add(-1, 'months');
  }

  goNextMonth() {
    this.currentDate = this.currentDate.add(1, 'months');
  }

  goCurrentMonth() {
    this.currentDate = moment(new Date());
  }
}
