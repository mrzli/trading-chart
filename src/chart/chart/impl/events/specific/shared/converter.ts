import {
  pixelDiffToItemSpanDiff,
  pixelDiffToPriceDiff,
} from '../../../../../helpers';
import { Point } from '../../../../../types';
import { CanvasChartState } from '../../../../types';

export interface PriceAndItemSpanDiff {
  readonly priceDiff: number;
  readonly itemSpanDiff: number;
}

export function pixelDiffToPriceAndItemSpanDiff(
  pixelDiff: Point,
  state: CanvasChartState,
): PriceAndItemSpanDiff {
  const { width, height } = state.layout.main;
  const { seriesPosition, priceRange } = state;

  const itemSpanDiff = pixelDiffToItemSpanDiff(
    pixelDiff.x,
    seriesPosition.itemSpan,
    width,
  );

  const priceDiff = pixelDiffToPriceDiff(pixelDiff.y, priceRange, height);

  return { priceDiff, itemSpanDiff };
}
