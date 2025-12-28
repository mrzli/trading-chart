import { Range } from '../../../../types';
import { Ohlc } from '../../../types';
import { getFirstVisibleIndex, getLastVisibleIndex } from '../../../util';
import {
  CandleSeriesInput,
  CandleSeriesOutput,
  CandleSeriesOutputItem,
} from './types';

export function processCandleSeriesData(
  input: CandleSeriesInput,
): CandleSeriesOutput {
  const {
    data,
    dataDisplayRange,
    position,
    xAxisLength,
    priceRange,
    yAxisLength,
  } = input;

  // x-axis
  const { rightItemOffset, itemSpan } = position;

  const leftItemOffset = rightItemOffset - itemSpan;
  const itemWidth = xAxisLength / itemSpan;

  const nonConstrainedFirstIndex = getFirstVisibleIndex(position, data.length);
  const firstIndex = Math.max(
    nonConstrainedFirstIndex,
    dataDisplayRange?.from ?? nonConstrainedFirstIndex,
  );
  const nonConstrainedLastIndex = getLastVisibleIndex(position, data.length);
  const lastIndex = Math.min(
    nonConstrainedLastIndex,
    dataDisplayRange?.to ?? nonConstrainedLastIndex,
  );

  // y-axis
  const { from, to } = priceRange;

  const priceDiff = to - from;
  const pricePerPixel = priceDiff / yAxisLength;

  // candle series

  const items: CandleSeriesOutputItem[] = [];
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
): CandleSeriesOutputItem {
  const { open, high, low, close } = ohlc;

  const isBull = close > open;
  const bodyLow = isBull ? open : close;
  const bodyHigh = isBull ? close : open;

  const x = Math.round(xOffset + xIndex * itemWidth);
  const y1 = priceToOffset(high, pricePerPixel, priceRange, yAxisLength);
  const y2 = priceToOffset(bodyHigh, pricePerPixel, priceRange, yAxisLength);
  const y3 = priceToOffset(bodyLow, pricePerPixel, priceRange, yAxisLength);
  const y4 = priceToOffset(low, pricePerPixel, priceRange, yAxisLength);

  return {
    x,
    y1,
    y2,
    y3,
    y4,
    type: isBull ? 'bull' : 'bear',
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
