import { Size } from '../../../types';

export function isSizeEqual(a: Size, b: Size): boolean {
  return a.width === b.width && a.height === b.height;
}
