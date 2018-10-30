import * as moment from 'moment';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss']
})

export class DayPage {

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

  dDay = '';

  constructor(private http: HttpClient) {
    this.getHolidays();
  }

  getHolidays() {
    this.http.get('./src/data/holidays.json')
      .subscribe((holidays: Array<Object>) => {
        this.holidays = holidays.map((holiday: Object) => {
          holiday['day'] = new Date(holiday['day']);
          holiday['repeat'] = holiday['repeat'] == "true";
          return holiday;
        });
        this.changeMonth();
      });
  }

  private pushMonth(month, date, isWeekend, isNotCurrentMonthDays, isToday, holiday) {
    month.push({date, isWeekend, isNotCurrentMonthDays, isToday, holiday});
  }

  private unshiftMonth(month, date, isWeekend, isNotCurrentMonthDays, isToday, holiday) {
    month.unshift({date, isWeekend, isNotCurrentMonthDays, isToday, holiday});
  }

  private insertPreMonth(month) {
    const firstDay = this.currentDate.date(1).day();
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      const num = preDaysInMonth - j;
      const holidays = this.makeHolidays(this.currentDate.clone().add(-1, 'months'), num);
      this.unshiftMonth(month, this.currentDate.clone().add(-1, 'months').set('date', num), false, true, false, holidays);
    }
  }

  private insertCurrentMonth(month) {
    const daysInMonth = this.currentDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == i.toString());
      const holidays = this.makeHolidays(this.currentDate, i);
      const isWeekend = this.currentDate.date(i).day() === 0 || this.currentDate.date(i).day() === 6;
      this.pushMonth(month, this.currentDate.clone().set('date', i), isWeekend, false, isToday, holidays);
    }
  }

  private insertNextMonth(month) {
    const nextMonthCount = this.TOTAL_DATYS - month.length;
    for (let z = 1; z <= nextMonthCount; z++) {
      const holidays = this.makeHolidays(this.currentDate.clone().add(1, 'months'), z);
      this.pushMonth(month, this.currentDate.clone().add(1, 'months').set('date', z), false, true, false, holidays);
    }
  }

  private makeHolidays(month, num) {
    return this.holidays.filter(h => {
      const zeroMonth = (h.day.getMonth() + 1) < 10 ? '0' + (h.day.getMonth() + 1) : (h.day.getMonth() + 1);
      return h.repeat ?
        `${zeroMonth}-${h.day.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.day.getFullYear()}-${zeroMonth}-${h.day.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });

  }

  private changeMonth() {
    var totalMonth = [];
    this.insertPreMonth(totalMonth);
    this.insertCurrentMonth(totalMonth);
    this.insertNextMonth(totalMonth);
    this.days = totalMonth;
  }

  goPreMonth() {
    this.currentDate.add(-1, 'months');
    this.changeMonth();
  }

  goNextMonth() {
    this.currentDate.add(1, 'months');
    this.changeMonth();
  }

  goCurrentMonth() {
    this.currentDate = moment(new Date());
    this.changeMonth();
  }

  detailDay(day) {
    this.selectDay = day;
    this.selectDay['day'] = day && day.num;
    this.selectDay['yearMonth'] = this.currentDate.format('MMMM YYYY');
    this.selectDay['date'] = day.date;

    const diff = this.selectDay['date'].
      startOf('day').
      diff(this.today.startOf('day'), 'days');

    this.dDay = diff === 0 ? 'D-day' : diff < 0 ? `(D${diff})` : `(D+${diff})`;
  }
}
