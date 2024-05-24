import { Range } from '../../types';

export function pixelToPrice(
  pixelPosition: number,
  axisLength: number,
  priceRange: Range,
): number {
  const { from, to } = priceRange;

  return (to - from) * (1 - pixelPosition / axisLength) + from;
}

export function priceToPixel(
  price: number,
  axisLength: number,
  priceRange: Range,
): number {
  const { from, to } = priceRange;

  return axisLength * (1 - (price - from) / (to - from));
}
