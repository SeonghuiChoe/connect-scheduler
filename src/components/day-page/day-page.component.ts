import * as moment from 'moment';
import { Component } from '@angular/core';
import { HolidaysService } from '../../services/holidays.service';
import { MatDialog } from '@angular/material';
import { DayInsertDialog } from '../day-insert-dialog/day-insert-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';

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

  schedule = [];

  dDay = '';

  constructor(
    private holidaysService: HolidaysService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService) {
    this.getHolidays();
  }

  private addZero(target) {
    return target < 10 ? '0' + target : target;
  }

  private pushMonth(month, date, isWeekend, isNotCurrentMonthDays, isToday, holidays) {
    month.push({date, isWeekend, isNotCurrentMonthDays, isToday, holidays});
  }

  private unshiftMonth(month, date, isWeekend, isNotCurrentMonthDays, isToday, holidays) {
    month.unshift({date, isWeekend, isNotCurrentMonthDays, isToday, holidays});
  }

  private insertPreMonth(month) {
    const firstDay = this.currentDate.date(1).day();
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      const num = preDaysInMonth - j;
      const holidays = this.makeHolidays(this.currentDate.clone().add(-1, 'months'), num).concat();
      const schedule = this.makeSchedule(this.currentDate.clone().add(-1, 'months'), num);
      this.unshiftMonth(
        month,
        this.currentDate.clone().add(-1, 'months').set('date', num),
        false,
        true,
        false,
        holidays.concat(schedule));
    }
  }

  private insertCurrentMonth(month) {
    const daysInMonth = this.currentDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == this.addZero(i));
      const holidays = this.makeHolidays(this.currentDate, i);
      const schedule = this.makeSchedule(this.currentDate, i);
      const isWeekend = this.currentDate.date(i).day() === 0 || this.currentDate.date(i).day() === 6;
      this.pushMonth(
        month,
        this.currentDate.clone().set('date', i),
        isWeekend,
        false,
        isToday,
        holidays.concat(schedule));
    }
  }

  private insertNextMonth(month) {
    const nextMonthCount = this.TOTAL_DATYS - month.length;
    for (let z = 1; z <= nextMonthCount; z++) {
      const holidays = this.makeHolidays(this.currentDate.clone().add(1, 'months'), z);
      const schedule = this.makeSchedule(this.currentDate.clone().add(1, 'months'), z);
      this.pushMonth(
        month,
        this.currentDate.clone().add(1, 'months').set('date', z),
        false,
        true,
        false,
        holidays.concat(schedule));
    }
  }

  // 중복제거
  private makeHolidays(month, num) {
    const holidays = this.holidays.filter(h => {
      const zeroMonth = this.addZero(h.day.getMonth() + 1);
      return h.repeat ?
        `${zeroMonth}-${h.day.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.day.getFullYear()}-${zeroMonth}-${h.day.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });
    return holidays.sort((a, b) => a.time - b.time);
  }

  // 중복제거
  private makeSchedule(month, num) {
    const schedule = this.schedule.filter(h => {
      const zeroMonth = this.addZero(h.day.getMonth() + 1);
      return h.repeat ?
        `${zeroMonth}-${h.day.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.day.getFullYear()}-${zeroMonth}-${h.day.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });
    return schedule.sort((a, b) => a.time - b.time);
  }

  private changeMonth() {
    var totalMonth = [];
    this.insertPreMonth(totalMonth);
    this.insertCurrentMonth(totalMonth);
    this.insertNextMonth(totalMonth);
    this.days = totalMonth;
  }

  private setSchedule() {
    this.localStorageService.setSchedule(JSON.stringify(this.schedule));
  }

  getHolidays() {
    // 공휴일을 가져온다.
    // 공휴일 정보가 있다면 가져오지 않는다.
    // 공휴일 정보를 가져온지 한달이 지났다면 다시 한번 가져온다.
    this.holidays = this.holidaysService.
      getHolidays().
      map((holiday: Object) => {
        holiday['day'] = new Date(holiday['day']);
        holiday['repeat'] = holiday['repeat'] == "true";
        return holiday;
      });

    // 스케줄을 가져온다.
    if (this.localStorageService.getSchedule()) {
      this.schedule = JSON.parse(this.localStorageService.getSchedule()).
        map((holiday: Object) => {
          holiday['day'] = new Date(holiday['day']);
          holiday['repeat'] = holiday['repeat'] == "true";
          return holiday;
        });
    } {
      this.setSchedule();
    }

    this.changeMonth();
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

  insertSchedule(day) {
    //holidays
    const dialogRef = this.dialog.open(DayInsertDialog, {
      width: '250px',
      data: {
        date: day.date.format('YYYY-MM-DD'),
        holidays: day.holidays,
        isNotCurrentMonthDays: day.isNotCurrentMonthDays,
        isToday: day.isToday,
        isWeekend: day.isWeekend,
      }
    });

    dialogRef.afterClosed().subscribe(schedule => {
      if (!schedule) return;
      this.schedule.push({
        "day": day.date.format('YYYY-MM-DD'),
        "time": "12",
        "name": schedule,
        "color": "#dcdcdc",
        "repeat": "false"
      })
      this.localStorageService.setSchedule(JSON.stringify(this.schedule));
    });
  }
}

