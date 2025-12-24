import { Point } from '../../../types';

export function isPointEqual(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}
