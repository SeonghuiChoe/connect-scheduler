import moment, { Moment } from 'moment';
import { Component } from '@angular/core';
import { EventService } from '../../services/events.service';
import { MatDialog } from '@angular/material';
import { DayInsertDialog } from '../day-insert-dialog/day-insert-dialog.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { Day } from '../../models/day';
import { Event } from '../../models/event';

@Component({
  selector: 'day-page',
  templateUrl: './day-page.component.html',
  styleUrls: ['./day-page.component.scss'],
})

export class DayPage {

  /**
   * 한 화면에 보여지는 날의 수
   */
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
  events: Array<Event> = [];

  constructor(
    private eventService: EventService,
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
   */
  private pushMonth = (
    month: Array<Day>, // 추가할 날들의 배열
    date: Date, // 날짜
    events: Array<object>, // 이벤트 목록
    isNotCurrentMonthDays: boolean, // 지금달이 아닌지 여부
    isToday: boolean, // 오늘 여부
    isWeekend: boolean, // 주말 여부
    isFront: boolean // 앞에 추가할건지 여부
  ) => {
    const day: Day = new Day(date, events, isNotCurrentMonthDays, isToday, isWeekend, false);
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
      const date = new Date(this.currentDate.clone().add(-1, 'months').set('date', num).toString());
      this.pushMonth(
        month,
        date,
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
      const date = new Date(this.currentDate.clone().set('date', i).toString());
      this.pushMonth(
        month,
        date,
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
      const date = new Date(this.currentDate.clone().add(1, 'months').set('date', z).toString());
      this.pushMonth(
        month,
        date,
        holidays,
        true,
        false,
        false,
        true);
    }
  }

  /**
   * 날에 맞는 휴일 가져오기
   */
  private makeHolidays(month: Moment, num: Number) {
    const holidays = this.events.filter(h => {
      const zeroMonth = this.addZero(h.date.getMonth() + 1);
      return h.isRepeat ?
        `${zeroMonth}-${h.date.getDate()}` === `${month.format('MM-')}${num}` :
        `${h.date.getFullYear()}-${zeroMonth}-${h.date.getDate()}` === `${month.format('YYYY-MM-')}${num}`;
    });
    return holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  /**
   * 달이 변경될때
   */
  private changeMonth() {
    this.selectDay = {};
    const totalMonth = [];
    this.insertPreMonth(totalMonth);
    this.insertCurrentMonth(totalMonth);
    this.insertNextMonth(totalMonth);
    this.days = totalMonth;
  }

  /**
   * 저장소에 저장하기
   */
  private setEvents() {
    this.localStorageService.setEvents(JSON.stringify(this.events));
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
      const filtered = this.events.
        filter(item => moment(item.date).format('YYYY-MM-DD') !== data[0].date);
      // 스케줄에 현재 스케줄을 제외한 정보에 변경된 정보를 추가
      this.events = filtered.concat(data[0].holidays);
      // 스케줄 로컬에 저장
      this.setEvents();
      // 입력 데이터가 없다면 아무 변화 없음
      if (!data[1]) return;
      const newEvents: Event = new Event(
        day.date,
        data[1],
        Event.COLORS.DEFALTE,
        false,
        day.detail
      );
      // 현제 날짜에 schedule 추가
      day.holidays.push(newEvents);
      // 스케줄만 모와놓은 자료에도 추가
      this.events.push(newEvents);
      // 스케줄 로컬에 저장
      this.setEvents();
    });
  }

  getHolidays() {
    // 공휴일을 가져온다.
    // 공휴일 정보가 있다면 가져오지 않는다.
    // 공휴일 정보를 가져온지 한달이 지났다면 다시 한번 가져온다.
    this.events = this.eventService.
      getEvents().
      map((event: Object) =>
        new Event(
          new Date(event['date']),
          event['note'],
          event['color'],
          event['isRepeat'] == true,
          event['detail']
        ));

    // 스케줄을 가져온다.
    if (this.localStorageService.getEvents()) {
      this.events = JSON.parse(this.localStorageService.getEvents()).
        map((holiday: Object) => {
          holiday['date'] = new Date(holiday['date']);
          holiday['isRepeat'] = holiday['isRepeat'] == true;
          return holiday;
        });
      this.setEvents();
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
    // 선택되어있던 날을 비 활성화
    this.days.forEach(day => day.isSelected = false);
    // 선택한날에 활성화
    day.isSelected = true;
    this.selectDay = day;

    /**
     * 선택한 날짜와 오늘과의 차이
     */
    const diff: Number = moment(day.date).
      startOf('day').
      diff(this.today.startOf('day'), 'days');

    /**
     * 오늘이라면 D-day로 표현하고
     * 음수라면 음수를 그대로 표현하고
     * 양수라면 +를 포함해서 표현한다.
     */
    this.selectDay['dDay'] = diff === 0
      ? 'D-day' : diff < 0
      ? `(D${diff})` : `(D+${diff})`;
  }
}
