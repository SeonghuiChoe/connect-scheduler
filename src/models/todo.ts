export class Todo {

  /**
   * 할일
   */
  private _content: string = '';

  /**
   * 종료 여부
   */
  private _isDone: boolean = false;

  /**
   * 중요 여부
   */
  private _isStar: boolean = false;

  /**
   * 변경 여부
   */
  private _editable: boolean = false;

  constructor(content, isDone = false, isStar = false, editable = false) {
    this._content = content;
    this._isDone = isDone;
    this._isStar = isStar;
    this._editable = editable;
  };

  get content() {
    return this._content;
  }

  get isDone() {
    return this._isDone;
  }

  get isStar() {
    return this._isStar;
  }

  set content(bool) {
    this._content = bool;
  }

  get editable() {
    return this._editable;
  }

  set isDone(bool) {
    this._isDone = bool;
  }

  set isStar(bool) {
    this._isStar = bool;
  }

  set editable(bool) {
    this._editable = bool;
  }
};
