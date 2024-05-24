import { Range } from '../../types';

export function changePriceSpan(
  priceRange: Range,
  newPriceSpan: number,
): Range {
  const midPrice = (priceRange.from + priceRange.to) / 2;
  return {
    from: midPrice - newPriceSpan / 2,
    to: midPrice + newPriceSpan / 2,
  };
}

export function multiplyPriceSpan(
  priceRange: Range,
  multiplier: number,
): Range {
  const oldPriceSpan = priceRange.to - priceRange.from;
  const newPriceSpan = oldPriceSpan * multiplier;
  return changePriceSpan(priceRange, newPriceSpan);
}
