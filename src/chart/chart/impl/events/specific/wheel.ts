import { round } from '@gmjs/number-util';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { updateCanvasChart } from '../../update';
import { CanvasChartEventStateWrapper } from './types';
import {
  getRelativeToElementPos,
  multiplyPriceSpan,
} from '../../../../helpers';
import { getEventArea } from './shared';

export function createHandlerWheel(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
): (event: WheelEvent) => void {
  return (event: WheelEvent): void => {
    const { layout, seriesPosition, priceRange } = stateWrapper.state;

    const pos = getRelativeToElementPos(event);
    const eventArea = getEventArea(pos, layout);

    switch (eventArea) {
      case 'main': {
        const currItemSpan = seriesPosition.itemSpan;
        const rawNewItemSpan =
          currItemSpan * getMultiplier(event, ITEM_SPAN_MULTIPLIER);
        const newItemSpan = round(rawNewItemSpan, ITEM_SPAN_PRECISION);
        stateWrapper.state = {
          ...stateWrapper.state,
          seriesPosition: {
            ...seriesPosition,
            itemSpan: newItemSpan,
          },
        };

        updateCanvasChart(input, options, stateWrapper);
        break;
      }
      case 'y-axis': {
        const multiplier = getMultiplier(event, PRICE_RANGE_MULTIPLIER);
        const newPriceRange = multiplyPriceSpan(priceRange, multiplier);

        stateWrapper.state = {
          ...stateWrapper.state,
          priceRange: newPriceRange,
        };

        updateCanvasChart(input, options, stateWrapper);

        break;
      }
    }
  };
}

function getMultiplier(event: WheelEvent, baseMultiplier: number): number {
  return event.deltaY < 0
    ? baseMultiplier
    : event.deltaY > 0
      ? 1 / baseMultiplier
      : 1;
}

const ITEM_SPAN_MULTIPLIER = 1.03;
const ITEM_SPAN_PRECISION = 2;

const PRICE_RANGE_MULTIPLIER = 1.03;
