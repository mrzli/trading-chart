import { Range } from '../../../types';

export function pixelToNumericValue(
  pixelPosition: number,
  axisLength: number,
  range: Range,
): number {
  const { from, to } = range;

  return (to - from) * (1 - pixelPosition / axisLength) + from;
}

export function numericValueToPixel(
  numericValue: number,
  axisLength: number,
  range: Range,
): number {
  const { from, to } = range;

  return Math.round(axisLength * (1 - (numericValue - from) / (to - from)));
}
