import { clamp } from '@gmjs/number-util';
import { SeriesPosition } from '../../types';

export function getFirstVisibleIndex(
  position: SeriesPosition,
  dataLength: number,
  positionAdjustment = 0,
): number {
  const { rightItemOffset, itemSpan } = position;

  const leftItemOffset = rightItemOffset - itemSpan;
  const firstIndex = Math.floor(leftItemOffset + positionAdjustment);

  return clamp(firstIndex, 0, dataLength - 1);
}

export function getLastVisibleIndex(
  position: SeriesPosition,
  dataLength: number,
  positionAdjustment = 0,
): number {
  const { rightItemOffset } = position;

  const lastIndex = Math.floor(rightItemOffset + positionAdjustment);

  return clamp(lastIndex, 0, dataLength - 1);
}
