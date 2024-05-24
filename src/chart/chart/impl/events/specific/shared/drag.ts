import {
  multiplyPriceSpan,
  multiplySeriesPosition,
} from '../../../../../helpers';
import { Point } from '../../../../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../../types';
import {
  EventMouseDragStateMain,
  EventMouseDragStateXAxis,
  EventMouseDragStateYAxis,
} from '../types';
import { pixelDiffToPriceAndItemSpanDiff } from './converter';

export function processDragMain(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  drag: EventMouseDragStateMain,
  pixelDiff: Point,
): void {
  const { state } = stateWrapper;

  const { itemSpanDiff, priceDiff } = pixelDiffToPriceAndItemSpanDiff(
    pixelDiff,
    state,
  );

  stateWrapper.state = {
    ...state,
    seriesPosition: {
      ...state.seriesPosition,
      rightItemOffset: drag.positionStart.rightItemOffset - itemSpanDiff,
    },
    priceRange: {
      from: drag.priceRangeStart.from - priceDiff,
      to: drag.priceRangeStart.to - priceDiff,
    },
  };
}

export function processDragXAxis(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  drag: EventMouseDragStateXAxis,
  pixelDiff: Point,
): void {
  const { state } = stateWrapper;

  const newPosition = multiplySeriesPosition(
    drag.positionStart,
    TIME_ZOOM_PER_PIXEL_MULTIPLIER ** pixelDiff.x,
  );

  stateWrapper.state = {
    ...state,
    seriesPosition: newPosition,
  };
}

const TIME_ZOOM_PER_PIXEL_MULTIPLIER = 1.001;

export function processDragYAxis(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  drag: EventMouseDragStateYAxis,
  pixelDiff: Point,
): void {
  const { state } = stateWrapper;

  const newPriceRange = multiplyPriceSpan(
    drag.priceRangeStart,
    PRICE_ZOOM_PER_PIXEL_MULTIPLIER ** pixelDiff.y,
  );

  stateWrapper.state = {
    ...state,
    priceRange: newPriceRange,
  };
}

const PRICE_ZOOM_PER_PIXEL_MULTIPLIER = 1.002;
