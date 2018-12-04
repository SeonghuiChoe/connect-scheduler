export class Day {

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

  constructor() {}
}
