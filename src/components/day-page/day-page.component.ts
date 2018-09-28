import { Component } from '@angular/core';
import { formatCurrency } from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})

export class dayPage {

  private TOTAL_DATYS = 42;

  /**
   * 선택된 날짜
   */
  currentDate = moment(new Date());

  today = moment(new Date());

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
    const firstDay = this.currentDate.date(1).day();
    const daysInMonth = this.currentDate.daysInMonth();
    var selectMonths = [];
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    const nextDaysInMonth = this.currentDate.clone().add(1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      selectMonths.unshift({
        num: preDaysInMonth - j,
        isweekend: false,
        isNotCurrentMonthDays: true,
        isToday: false,
      });
    }
    console.log(this.today.format('YYYYMM'));
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == i)
      selectMonths.push({
        num: i,
        isWeekend: this.currentDate.date(i).day() === 0,
        isPreMonthDays: false,
        isToday: isToday,
      });
    }
    const nextMonthCount = this.TOTAL_DATYS - selectMonths.length;
    for (let z = 1; z <= nextMonthCount; z++) {
      selectMonths.push({
        num: z,
        isweekend: false,
        isNotCurrentMonthDays: true,
        isToday: false,
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
