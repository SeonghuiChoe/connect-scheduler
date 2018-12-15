export class Day {

  private _num: number = 0;

  /**
   * 날짜
   */
  private _date: Date = new Date();

  /**
   * 공휴일 및 스케줄
   */
  private events: Array<Object> = [];

  /**
   * 현재 보고있는 달이 아닌지
   */
  private isNotCurrentMonthDays: boolean = false;

  /**
   * 오늘 여부
   */
  private isToday: boolean = false;

  /**
   * 주말 여부
   */
  private isWeeked: boolean = false;

  /**
   * 선택 여부
   */
  private _isSelected: boolean = false;

  constructor(date, events, isNotCurrentMonthDays, isToday, isWeeked, isSelected) {
    this._date = date;
    this.events = events;
    this.isNotCurrentMonthDays = isNotCurrentMonthDays;
    this.isToday = isToday;
    this.isWeeked = isWeeked;
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
}
