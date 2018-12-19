export class Todo {

  /**
   * 할일
   */
  private _name: string = '';

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

  constructor(name, isDone, isStar, editable) {
    this._name = name;
    this._isDone = isDone;
    this._isStar = isStar;
    this._editable = editable;
  };
};
