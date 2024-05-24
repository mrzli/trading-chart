import { Point } from '../types';

export function getRelativeToElementPos(event: MouseEvent): Point {
  const el = event.currentTarget as HTMLElement;

  return {
    x: event.x - el.offsetLeft,
    y: event.y - el.offsetTop,
  };
}

export function getPointDiff(from: Point, to: Point): Point {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
  };
}

export function getCanvasSize(c: CanvasRenderingContext2D): Point {
  return {
    x: c.canvas.width,
    y: c.canvas.height,
  };
}
