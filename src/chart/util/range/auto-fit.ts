import { Range } from '../../../types';
import { Ohlc, SeriesPosition } from '../../types';
import { getFirstVisibleIndex, getLastVisibleIndex } from '../series';

export function getAutoFitPriceRange(
  data: readonly Ohlc[],
  displayItemRange: Range | undefined,
  seriesPosition: SeriesPosition,
  paddingFraction: number,
): Range | undefined {
  if (data.length === 0) {
    return undefined;
  }

  const nonConstrainedFirstIndex = getFirstVisibleIndex(
    seriesPosition,
    data.length,
  );
  const firstIndex = Math.max(
    nonConstrainedFirstIndex,
    displayItemRange?.from ?? nonConstrainedFirstIndex,
  );
  const nonConstrainedLastIndex = getLastVisibleIndex(
    seriesPosition,
    data.length,
  );
  const lastIndex = Math.min(
    nonConstrainedLastIndex,
    displayItemRange?.to ?? nonConstrainedLastIndex,
  );

  let minPrice = Number.MAX_VALUE;
  let maxPrice = Number.MIN_VALUE;

  for (let i = firstIndex; i <= lastIndex; i++) {
    const item = data[i];
    minPrice = Math.min(minPrice, item.low);
    maxPrice = Math.max(maxPrice, item.high);
  }

  const midPrice = (minPrice + maxPrice) / 2;
  const priceSpan = (maxPrice - minPrice) / (1 - 2 * paddingFraction);

  const priceRange: Range = {
    from: midPrice - priceSpan / 2,
    to: midPrice + priceSpan / 2,
  };

  return priceRange;
}
