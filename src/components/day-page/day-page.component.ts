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

  firstDay = 0;

  daysInMonth = 0;

  weekdays = [
    {name: 'Sun', isWeekend: true},
    {name: 'Mon', isWeekend: false},
    {name: 'Tue', isWeekend: false},
    {name: 'Wed', isWeekend: false},
    {name: 'Thu', isWeekend: false},
    {name: 'Fri', isWeekend: false},
    {name: 'Sat', isWeekend: true}
  ];

  days: = [];

  constructor() {
    this.changeMonth();
  }

  private changeMonth() {
    this.firstDay = this.currentDate.date(1).day();
    this.daysInMonth = this.currentDate.daysInMonth();
    var selectMonths = [];
    for (let j = 0; j < this.firstDay; j++) {
      selectMonths.push({});
    }
    for (let i = 1; i <= this.daysInMonth; i ++) {
      selectMonths.push({
        num: i,
        isWeekend: this.currentDate.date(i).day() === 0;
      });
    }

    this.days = selectMonths;
  }

  goPreMonth() {
    this.currentDate = this.currentDate.add(-1, 'months');
    this.changeMonth();
  }

  goNextMonth() {
    this.currentDate = this.currentDate.add(1, 'months');
    this.changeMonth();
  }

  goCurrentMonth() {
    this.currentDate = moment(new Date());
    this.changeMonth();
  }
}
