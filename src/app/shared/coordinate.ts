export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface ISize {
  width: number;
  height: number;
}

export interface ILineSegment {
  start: IPoint;
  end: IPoint;
}

export class Rect implements IRect {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get left() {
    return this.x;
  }

  get right() {
    return this.x + this.width;
  }

  get top() {
    return this.y;
  }

  get bottom() {
    return this.y + this.height;
  }
}
