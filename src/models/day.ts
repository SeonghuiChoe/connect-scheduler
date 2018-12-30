import { Holiday } from './holiday';
import { Event } from './event';

export class Day {

  // 날짜의 일
  private _num: number = 1;

  constructor(
    // 날짜
    private _date: Date = new Date(),
    // 공휴일
    private _holidays: Array<Holiday> = [],
    // 이벤트
    private _events: Array<Event> = [],
    // 현재 선택된 달이 아닌지
    private _isNotCurrentMonthDays: boolean = false,
    // 오늘 여부
    private _isToday: boolean = false,
    // 주말 여부
    private _isWeekend: boolean = false,
    // 선택 여부
    private _isSelected: boolean = false) {
    this._num = this._date.getDate();
  }

  get date() {
    return this._date;
  }

  get holidays() {
    return this._holidays;
  }

  set holidays(holidays) {
    this._holidays = holidays;
  }

  get events() {
    return this._events;
  }

  set events(events) {
    this._events = events;
  }

  get isNotCurrentMonthDays() {
    return this._isNotCurrentMonthDays;
  }

  set isNotCurrentMonthDays(bool) {
    this._isNotCurrentMonthDays = bool;
  }

  get isToday() {
    return this._isToday;
  }

  set isToday(bool) {
    this._isToday = bool;
  }

  get isWeekend() {
    return this._isWeekend;
  }

  set isWeekend(bool) {
    this._isWeekend = bool;
  }

  get isSelected() {
    return this._isSelected;
  }

  set isSelected(bool) {
    this._isSelected = bool;
  }

  get num() {
    return this._num;
  }
}
