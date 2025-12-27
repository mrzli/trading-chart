import { SeriesPosition } from '../../types';

export function multiplySeriesPosition(
  position: SeriesPosition,
  multiplier: number,
): SeriesPosition {
  return {
    ...position,
    itemSpan: position.itemSpan * multiplier,
  };
}
