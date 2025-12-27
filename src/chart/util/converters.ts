import { Range } from '../../types';

export function numberDiffToPixelDiff(
  numberDiff: number,
  numberRange: Range,
  pixelLength: number,
): number {
  return (-numberDiff * pixelLength) / (numberRange.to - numberRange.from);
}

export function pixelDiffToNumberDiff(
  pixelDiff: number,
  numberRange: Range,
  pixelLength: number,
): number {
  return (-pixelDiff * (numberRange.to - numberRange.from)) / pixelLength;
}

export function itemSpanDiffToPixelDiff(
  itemSpanDiff: number,
  itemSpan: number,
  pixelLength: number,
): number {
  return (itemSpanDiff * pixelLength) / itemSpan;
}

export function pixelDiffToItemSpanDiff(
  pixelDiff: number,
  itemSpan: number,
  pixelLength: number,
): number {
  return (pixelDiff * itemSpan) / pixelLength;
}
