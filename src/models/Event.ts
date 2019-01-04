enum ColorStatus {
  DEFALTE = '#eee',
}

export class Event {

  /**
   * 색
   */
  public static COLORS = ColorStatus;

  /**
   * 날짜
   */
  private _date: Date = new Date();

  /**
   * 내용
   */
  private _note: String = '';

  /**
   * 상세
   */
  private _detail: String = '';

  /**
   * 색
   */
  private _color: ColorStatus = ColorStatus.DEFALTE;

  /**
   * 반복설정
   */
  private _isRepeat: boolean = false;

  /**
   * 공휴일 여부
   */
  private _isHoliday: boolean = false;

  constructor(
    date, name, color, isRepeat, detail, isHoliday = false
  ) {
    this._date = date;
    this._note = name;
    this._color = color;
    this._isRepeat = isRepeat;
    this._detail = detail;
    this._isHoliday = isHoliday;
  }

  get date() {
    return this._date;
  }

  get note() {
    return this._note;
  }

  get color() {
    return this._color;
  }

  get isRepeat() {
    return this._isRepeat;
  };

  get detail() {
    return this._detail;
  }

  get isHoliday() {
    return this._isHoliday;
  }
}
