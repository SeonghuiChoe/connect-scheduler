enum ColorStatus {
  DEFALTE,
}

export class Schedule {

  /**
   * 색
   */
  public static COLORS = ColorStatus;

  /**
   * 날짜
   */
  private date: Date = new Date();

  /**
   * 내용
   */
  private note: String = '';

  /**
   * 색
   */
  private color: ColorStatus = ColorStatus.DEFALTE;

  /**
   * 반복설정
   */
  private isRepeat: boolean = false;

  constructor() {}
}
