import { CandleSeriesData, CandleSeriesItem } from '../../draw';
import { Ohlc, Range, SeriesPosition } from '../../types';
import { getFirstVisibleIndex, getLastVisibleIndex } from './visible-index';

export function getOhlcSeriesValues(
  data: readonly Ohlc[],
  position: SeriesPosition,
  xAxisLength: number,
  priceRange: Range,
  yAxisLength: number,
): CandleSeriesData {
  // x-axis
  const { rightItemOffset, itemSpan } = position;

  const leftItemOffset = rightItemOffset - itemSpan;
  const itemWidth = xAxisLength / itemSpan;
  const firstIndex = getFirstVisibleIndex(position, data.length);
  const lastIndex = getLastVisibleIndex(position, data.length);

  // y-axis
  const { from, to } = priceRange;

  const priceDiff = to - from;
  const pricePerPixel = priceDiff / yAxisLength;

  // candle series

  const items: CandleSeriesItem[] = [];
  const firstXOffset =
    (firstIndex - leftItemOffset + ITEM_X_FRACTION) * itemWidth;

  for (let i = firstIndex; i <= lastIndex; i++) {
    const item = data[i];
    const candleItem = toCandleSeriesItem(
      item,
      firstXOffset,
      i - firstIndex,
      itemWidth,
      priceRange,
      pricePerPixel,
      yAxisLength,
    );
    items.push(candleItem);
  }

  return {
    itemWidth,
    items,
  };
}

function toCandleSeriesItem(
  ohlc: Ohlc,
  xOffset: number,
  xIndex: number,
  itemWidth: number,
  priceRange: Range,
  pricePerPixel: number,
  yAxisLength: number,
): CandleSeriesItem {
  const { time, open, high, low, close } = ohlc;

  const isBull = close > open;
  const bodyLow = isBull ? open : close;
  const bodyHigh = isBull ? close : open;

  const x = Math.round(xOffset + xIndex * itemWidth);
  const y1 = priceToOffset(high, pricePerPixel, priceRange, yAxisLength);
  const y2 = priceToOffset(bodyHigh, pricePerPixel, priceRange, yAxisLength);
  const y3 = priceToOffset(bodyLow, pricePerPixel, priceRange, yAxisLength);
  const y4 = priceToOffset(low, pricePerPixel, priceRange, yAxisLength);

  return {
    time,
    x,
    y1,
    y2,
    y3,
    y4,
    color: isBull ? GREEN : RED,
  };
}

function priceToOffset(
  price: number,
  pricePerPixel: number,
  priceRange: Range,
  yAxisLength: number,
): number {
  return yAxisLength - Math.round((price - priceRange.from) / pricePerPixel);
}

const ITEM_X_FRACTION = 0.5;

const RED = '#F23645';
const GREEN = '#089981';
