import moment, { Moment } from 'moment';
import { Component } from '@angular/core';
import { HolidaysService } from '../../services/holidays.service';
import { MatDialog } from '@angular/material';
import { DayInsertDialog } from '../day-insert-dialog/day-insert-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Day } from '../../models/day';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
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
    // this.getHolidays();
    this.changeMonth();
  }

  private addZero(target) {
    return target < 10 ? '0' + target : target;
  }

  /**
   * 보여질 날들의 목록에 날을 추가
   * @param {Array<Day>} month 추가할 날들의 배열
   * @param {Moment} date 날짜
   * @param {Array<Object>} events 이벤트 목록
   * @param {boolean} isNotCurrentMonthDays 지금달이 아닌지 여부
   * @param {boolean} isToday 오늘 여부
   * @param {boolean} isWeekend 주말 여부
   * @param {boolean} isFront 앞에 추가할건지 여부
   */
  private pushMonth(month: Array<Day>, date: Moment, events: Array<object>, isNotCurrentMonthDays: boolean, isToday: boolean, isWeekend: boolean, isFront: boolean) {
    const makeDateType = new Date(date.toString());
    const day = new Day(makeDateType, events, isNotCurrentMonthDays, isToday, isWeekend);
    isFront ? month.push(day) : month.unshift(day);
  }

  private insertPreMonth(month) {
    const firstDay = this.currentDate.date(1).day();
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      const num = preDaysInMonth - j;
      const holidays = this.makeHolidays(this.currentDate.clone().add(-1, 'months'), num).concat();
      const schedule = this.makeSchedule(this.currentDate.clone().add(-1, 'months'), num);
      this.pushMonth(
        month,
        this.currentDate.clone().add(-1, 'months').set('date', num),
        holidays.concat(schedule),
        true,
        false,
        false,
        false);
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
        holidays.concat(schedule),
        false,
        isToday,
        isWeekend,
        true);
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
        holidays.concat(schedule),
        true,
        false,
        false,
        true);
    }
  }

  // 중복제거 holiday and schdule
  private makeHolidays(month, num) {
    const holidays = this.holidays.filter(h => {
      const zeroMonth = this.addZero(h.day.getMonth() + 1);
      return h.repeat ?
        `${zeroMonth}-${h.day.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.day.getFullYear()}-${zeroMonth}-${h.day.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });
    return holidays.sort((a, b) => a.time - b.time);
  }

  private makeSchedule(month, num) {
    // 스케줄 입력으로 인해 day가 문자열로 들어감
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

  /**
   * 더블클릭시 입력하도록
   * @param day
   */
  private insertSchedule(day) {
    // holidays
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

    dialogRef.afterClosed().subscribe(data => {
      // 입력데이터와 변경된 day정보를 갖고오기 때문에 배열
      if (!data || !Array.isArray(data)) return;
      // 기존에 저장되있는 스케줄에서 선택된 날의 스케줄을 제외한 자료
      const filtered = this.schedule.
        filter(item => moment(item.day).format('YYYY-MM-DD') !== data[0].date);
      // 스케줄에 현재 스케줄을 제외한 정보에 변경된 정보를 추가
      this.schedule = filtered.concat(data[0].holidays);
      // 스케줄 로컬에 저장
      this.setSchedule();
      // 입력 데이터가 없다면 아무 변화 없음
      if (!data[1]) return;
      const newSchedule = {
        day: day.date,
        time: "12",
        name: data[1],
        color: "#dcdcdc",
        repeat: "false"
      };
      // 현제 날짜에 schedule 추가
      day.holidays.push(newSchedule);
      // 스케줄만 모와놓은 자료에도 추가
      this.schedule.push(newSchedule);
      // 스케줄 로컬에 저장
      this.setSchedule();
    });
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

  /**
   * 선택된 날의 대한 정보 하단에 표시
   */
  detailDay(day: Day) {
    this.selectDay = day;
    this.selectDay['num'] = day.getNum();
    this.selectDay['date'] = moment(day.getOriginDate());
    this.selectDay['yearMonth'] = this.currentDate.format('MMMM YYYY');

    const diff = this.selectDay['date'].
      startOf('day').
      diff(this.today.startOf('day'), 'days');

    this.dDay = diff === 0 ? 'D-day' : diff < 0 ? `(D${diff})` : `(D+${diff})`;
  }
}

