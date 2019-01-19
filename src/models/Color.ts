enum BG_COLORS {
  DEFALTE = '#eee',
}

enum TEXT_COLORS {
  DEFALTE = '#777',
}

export class Color {
  constructor(
    // name
    private _name: string = 'gray',
    // background color
    private _bgColor: string = BG_COLORS.DEFALTE,
    // Text color
    private _textColor: string = TEXT_COLORS.DEFALTE) {
  }

  get name() {
    return this._name;
  }

  get bgColor() {
    return this._bgColor;
  }

  get textColor() {
    return this._textColor;
  }
}
