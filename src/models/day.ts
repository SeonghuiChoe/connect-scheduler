export class Day {

  private num: number = 0;

  /**
   * 날짜
   */
  private date: Date = new Date();

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

  constructor(date, events, isNotCurrentMonthDays, isToday, isWeeked) {
    this.date = date;
    this.events = events;
    this.isNotCurrentMonthDays = isNotCurrentMonthDays;
    this.isToday = isToday;
    this.isWeeked = isWeeked;
    this.num = this.date.getDate();
  }

  /**
   * set으로 변경해야함
   */
  getOriginDate() {
    return this.date;
  }

  getNum() {
    return this.num;
  }
}
