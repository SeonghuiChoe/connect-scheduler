export class Day {

  private _num: number = 0;

  /**
   * 날짜
   */
  private _date: Date = new Date();

  /**
   * 공휴일 및 스케줄
   */
  private _events: Array<Object> = [];

  /**
   * 현재 보고있는 달이 아닌지
   */
  private _isNotCurrentMonthDays: boolean = false;

  /**
   * 오늘 여부
   */
  private _isToday: boolean = false;

  /**
   * 주말 여부
   */
  private _isWeekend: boolean = false;

  /**
   * 선택 여부
   */
  private _isSelected: boolean = false;

  constructor(date, events, isNotCurrentMonthDays, isToday, isWeekend, isSelected) {
    this._date = date;
    this._events = events;
    this._isNotCurrentMonthDays = isNotCurrentMonthDays;
    this._isToday = isToday;
    this._isWeekend = isWeekend;
    this._num = this._date.getDate();
    this._isSelected = isSelected;
  }

  get date() {
    return this._date;
  }

  get num() {
    return this._num;
  }

  get isSelected() {
    return this._isSelected;
  }

  set isSelected(bool) {
    this._isSelected = bool;
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
}
