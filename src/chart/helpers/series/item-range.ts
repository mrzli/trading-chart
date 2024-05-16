import { clamp } from '@gmjs/number-util';
import { SeriesPosition } from '../../types';

export function getFirstVisibleIndex(
  position: SeriesPosition,
  dataLength: number,
): number {
  const { rightItemOffset, itemSpan } = position;

  const leftItemOffset = rightItemOffset - itemSpan;
  const firstIndex = Math.floor(leftItemOffset);

  return clamp(firstIndex, 0, dataLength - 1);
}

export function getLastVisibleIndex(
  position: SeriesPosition,
  dataLength: number,
): number {
  const { rightItemOffset } = position;

  const lastIndex = Math.ceil(rightItemOffset);

  return clamp(lastIndex, 0, dataLength - 1);
}
