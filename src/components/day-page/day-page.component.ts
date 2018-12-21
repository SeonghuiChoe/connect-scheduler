import moment, { Moment } from 'moment';
import { Component } from '@angular/core';
import { HolidaysService } from '../../services/holidays.service';
import { MatDialog } from '@angular/material';
import { DayInsertDialog } from '../day-insert-dialog/day-insert-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Day } from '../../models/day';
import { Schedule } from '../../models/schedule';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})

export class DayPage {

  private TOTAL_DATYS: number = 42;

  /**
   * 선택된 날짜
   */
  currentDate: Moment = moment(new Date());

  today: Moment = moment(new Date());

  firstDay: number = 0;

  daysInMonth: number = 0;

  weekdays: Array<Object> = [
    {name: 'Sun', isWeekend: true},
    {name: 'Mon', isWeekend: false},
    {name: 'Tue', isWeekend: false},
    {name: 'Wed', isWeekend: false},
    {name: 'Thu', isWeekend: false},
    {name: 'Fri', isWeekend: false},
    {name: 'Sat', isWeekend: true}
  ];

  days: Array<Day> = [];

  selectDay: Object = {};

  // 음력, 색표시, 시간설정
  holidays: Array<Schedule> = [];

  schedule: Array<Schedule> = [];

  constructor(
    private holidaysService: HolidaysService,
    private dialog: MatDialog,
    private localStorageService: LocalStorageService) {
    this.getHolidays();
    this.changeMonth();
  }

  /**
   * 10미만 앞에 0추가
   */
  private addZero(target: number) {
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
    const makeDateType: Date = new Date(date.toString());
    const day: Day = new Day(makeDateType, events, isNotCurrentMonthDays, isToday, isWeekend, false);
    isFront ? month.push(day) : month.unshift(day);
  }

  /**
   * 전달 추가
   */
  private insertPreMonth(month: Array<Day>) {
    const firstDay = this.currentDate.date(1).day();
    const preDaysInMonth = this.currentDate.clone().add(-1, 'months').daysInMonth();
    for (let j = 0; j < firstDay; j++) {
      const num = preDaysInMonth - j;
      const holidays = this.makeHolidays(this.currentDate.clone().add(-1, 'months'), num).concat();
      this.pushMonth(
        month,
        this.currentDate.clone().add(-1, 'months').set('date', num),
        holidays,
        true,
        false,
        false,
        false);
    }
  }

  /**
   * 현재달 출력
   */
  private insertCurrentMonth(month: Array<Day>) {
    const daysInMonth = this.currentDate.daysInMonth();
    for (let i = 1; i <= daysInMonth; i ++) {
      const isToday =
        (this.today.format('YYYYMM') == this.currentDate.format('YYYYMM')) &&
        (this.today.format('DD') == this.addZero(i));
      const holidays = this.makeHolidays(this.currentDate, i);
      const isWeekend = this.currentDate.date(i).day() === 0 || this.currentDate.date(i).day() === 6;
      this.pushMonth(
        month,
        this.currentDate.clone().set('date', i),
        holidays,
        false,
        isToday,
        isWeekend,
        true);
    }
  }

  /**
   * 다음 달 추가
   */
  private insertNextMonth(month: Array<Day>) {
    const nextMonthCount = this.TOTAL_DATYS - month.length;
    for (let z = 1; z <= nextMonthCount; z++) {
      const holidays = this.makeHolidays(this.currentDate.clone().add(1, 'months'), z);
      this.pushMonth(
        month,
        this.currentDate.clone().add(1, 'months').set('date', z),
        holidays,
        true,
        false,
        false,
        true);
    }
  }

  private makeHolidays(month, num) {
    const holidays = this.holidays.filter(h => {
      const zeroMonth = this.addZero(h.date.getMonth() + 1);
      return h.isRepeat ?
        `${zeroMonth}-${h.date.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.date.getFullYear()}-${zeroMonth}-${h.date.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });
    return holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  private changeMonth() {
    this.selectDay = {};
    const totalMonth = [];
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
        filter(item => moment(item.date).format('YYYY-MM-DD') !== data[0].date);
      // 스케줄에 현재 스케줄을 제외한 정보에 변경된 정보를 추가
      this.schedule = filtered.concat(data[0].holidays);
      // 스케줄 로컬에 저장
      this.setSchedule();
      // 입력 데이터가 없다면 아무 변화 없음
      if (!data[1]) return;
      const newSchedule: Schedule = new Schedule(
        day.date,
        data[1],
        Schedule.COLORS.DEFALTE,
        false,
        day.detail
      );
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
      map((holiday: Object) =>
        new Schedule(
          new Date(holiday['date']),
          holiday['note'],
          holiday['color'],
          holiday['isRepeat'] == true,
          holiday['detail']
        ));

    // 스케줄을 가져온다.
    if (this.localStorageService.getSchedule()) {
      this.schedule = JSON.parse(this.localStorageService.getSchedule()).
        map((holiday: Object) => {
          holiday['date'] = new Date(holiday['date']);
          holiday['isRepeat'] = holiday['isRepeat'] == true;
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
    this.days.forEach(day => day.isSelected = false);
    day.isSelected = true;

    this.selectDay = day;
    this.selectDay['dayNum'] = day.num;
    this.selectDay['yearMonth'] = this.currentDate.format('MMMM YYYY');

    const diff = moment(day.date).
      startOf('day').
      diff(this.today.startOf('day'), 'days');

    this.selectDay['dDay'] = diff === 0 ? 'D-day' : diff < 0 ? `(D${diff})` : `(D+${diff})`;
  }
}
