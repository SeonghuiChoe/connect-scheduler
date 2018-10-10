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

  days = [];

  holidays = [{
    day: '2018-10-3',
    startTime: '9',
    endTime: '22',
    name: '개천절',
    color: '#dcdcdc'
  }];

  constructor() {
    this.changeMonth();
  }

  private pushMonth(month, num, isweekend, isNotCurrentMonthDays, isToday, holiday) {
    month.push({num, isweekend, isNotCurrentMonthDays, isToday, holiday});
  }

  private unshiftMonth(month, num, isweekend, isNotCurrentMonthDays, isToday, holiday) {
    month.unshift({num, isweekend, isNotCurrentMonthDays, isToday, holiday});
  }

  private insertPreMonth(month) {
    const firstDay = this.currentDate.date(1).day();
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      this.unshiftMonth(month, preDaysInMonth - j, false, true, false, []);
    }
  }

  private insertCurrentMonth(month) {
    const daysInMonth = this.currentDate.daysInMonth();
    const nextDaysInMonth = this.currentDate.clone().add(1, 'months').daysInMonth();
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == i.toString());
      const holidays = this.holidays.filter(h => h.day === `${this.currentDate.format('YYYY-MM-')}${i}`) || [];
      this.pushMonth(month, i, this.currentDate.date(i).day() === 0, false, isToday, holidays);
    }
  }

  private insertNextMonth(month) {
    const nextMonthCount = this.TOTAL_DATYS - month.length;
    for (let z = 1; z <= nextMonthCount; z++) {
      this.pushMonth(month, z, false, true, false, []);
    }
  }

  private changeMonth() {
    var totalMonth = [];
    this.insertPreMonth(totalMonth);
    this.insertCurrentMonth(totalMonth);
    this.insertNextMonth(totalMonth);
    this.days = totalMonth;
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
