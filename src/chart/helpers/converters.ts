import { Range } from '../types';

export function priceDiffToPixelDiff(
  priceDiff: number,
  priceRange: Range,
  pixelLength: number,
): number {
  return (-priceDiff * pixelLength) / (priceRange.to - priceRange.from);
}

export function pixelDiffToPriceDiff(
  pixelDiff: number,
  priceRange: Range,
  pixelLength: number,
): number {
  return (-pixelDiff * (priceRange.to - priceRange.from)) / pixelLength;
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
