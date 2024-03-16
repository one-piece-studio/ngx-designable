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

export class Point implements IPoint {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export function isPointInRect(point: IPoint, rect: IRect, sensitive = true) {
  const boundSensor = (value: number) => {
    if (!sensitive) return 0;
    const sensor = value * 0.1;
    if (sensor > 20) return 20;
    if (sensor < 10) return 10;
    return sensor;
  };

  return (
    point.x >= rect.x + boundSensor(rect.width) &&
    point.x <= rect.x + rect.width - boundSensor(rect.width) &&
    point.y >= rect.y + boundSensor(rect.height) &&
    point.y <= rect.y + rect.height - boundSensor(rect.height)
  );
}

export function calcDistanceOfPointToRect(point: IPoint, rect: IRect) {
  let minX = Math.min(Math.abs(point.x - rect.x), Math.abs(point.x - (rect.x + rect.width)));
  let minY = Math.min(Math.abs(point.y - rect.y), Math.abs(point.y - (rect.y + rect.height)));
  if (point.x >= rect.x && point.x <= rect.x + rect.width) {
    minX = 0;
  }
  if (point.y >= rect.y && point.y <= rect.y + rect.height) {
    minY = 0;
  }

  return Math.sqrt(minX ** 2 + minY ** 2);
}

export function calcDistancePointToEdge(point: IPoint, rect: IRect) {
  const distanceTop = Math.abs(point.y - rect.y);
  const distanceBottom = Math.abs(point.y - (rect.y + rect.height));
  const distanceLeft = Math.abs(point.x - rect.x);
  const distanceRight = Math.abs(point.x - (rect.x + rect.width));
  return Math.min(distanceTop, distanceBottom, distanceLeft, distanceRight);
}

export function isNearAfter(point: IPoint, rect: IRect, inline = false) {
  if (inline) {
    return (
      Math.abs(point.x - rect.x) + Math.abs(point.y - rect.y) >
      Math.abs(point.x - (rect.x + rect.width)) + Math.abs(point.y - (rect.y + rect.height))
    );
  }
  return Math.abs(point.y - rect.y) > Math.abs(point.y - (rect.y + rect.height));
}

export function calcBoundingRect(rects: IRect[]) {
  if (!rects?.length) return null;
  if (rects?.length === 1 && !rects[0]) return null;
  let minTop = Infinity;
  let maxBottom = -Infinity;
  let minLeft = Infinity;
  let maxRight = -Infinity;
  rects.forEach(item => {
    const rect = new Rect(item.x, item.y, item.width, item.height);
    if (rect.top <= minTop) {
      minTop = rect.top;
    }
    if (rect.bottom >= maxBottom) {
      maxBottom = rect.bottom;
    }
    if (rect.left <= minLeft) {
      minLeft = rect.left;
    }
    if (rect.right >= maxRight) {
      maxRight = rect.right;
    }
  });
  return new Rect(minLeft, minTop, maxRight - minLeft, maxBottom - minTop);
}
