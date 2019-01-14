export class Color {
  // 색 이름
  private _name: string;
  // 색상
  private _colorData: string;

  constructor(name: string, colorData: string) {
    this._name = name;
    this._colorData = colorData;
  }

  get name() {
    return this._name;
  }

  get colorData() {
    return this._colorData;
  }
}
