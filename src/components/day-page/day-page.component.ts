import { Component } from '@angular/core';
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

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

  selectDay = {};

  // 음력, 색표시, 시간설정
  holidays = [];

  constructor(private http: HttpClient) {
    this.getHolidays();
  }

  getHolidays() {
    this.http.get('./src/data/holidays.json')
      .subscribe((holidays: Array<Object>) => {
        this.holidays = holidays.map((holiday: Object) => {
          holiday['day'] = new Date(holiday['day']);
          return holiday;
        });
        this.changeMonth();
      });
  }

  private pushMonth(month, num, isWeekend, isNotCurrentMonthDays, isToday, holiday) {
    month.push({num, isWeekend, isNotCurrentMonthDays, isToday, holiday});
  }

  private unshiftMonth(month, num, isWeekend, isNotCurrentMonthDays, isToday, holiday) {
    month.unshift({num, isWeekend, isNotCurrentMonthDays, isToday, holiday});
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
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == i.toString());
      const holidays = this.holidays.filter(h => h.repeat ?
        `${(h.day.getMonth() + 1)}-${h.day.getDate()}` === `${this.currentDate.format('MM-')}${i}` :
        `${h.day.getFullYear()}-${(h.day.getMonth() + 1)}-${h.day.getDate()}` === `${this.currentDate.format('YYYY-MM-')}${i}`);
      const isWeekend = this.currentDate.date(i).day() === 0 || this.currentDate.date(i).day() === 6;
      this.pushMonth(month, i, isWeekend, false, isToday, holidays);
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

  detailDay(day) {
    this.selectDay = day;
    this.selectDay['date'] = this.currentDate.format('MMMM YYYY');
  }
}
