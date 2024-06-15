import { SeriesPosition } from '../../types';

export function pixelToSeriesIndexFractional(
  pixelPosition: number,
  axisLength: number,
  seriesPosition: SeriesPosition,
): number {
  const { rightItemOffset, itemSpan } = seriesPosition;
  const leftItemOffset = rightItemOffset - itemSpan;

  return leftItemOffset + (pixelPosition / axisLength) * itemSpan;
}

export function seriesIndexFractionalToPixel(
  seriesIndexFractional: number,
  axisLength: number,
  seriesPosition: SeriesPosition,
): number {
  const { rightItemOffset, itemSpan } = seriesPosition;
  const leftItemOffset = rightItemOffset - itemSpan;

  return ((seriesIndexFractional - leftItemOffset) / itemSpan) * axisLength;
}
