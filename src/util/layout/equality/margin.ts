import { Margin } from '../../../types';

export function isMarginEqual(a: Margin, b: Margin): boolean {
  return (
    a.left === b.left &&
    a.right === b.right &&
    a.top === b.top &&
    a.bottom === b.bottom
  );
}
