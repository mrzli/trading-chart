import {
  getFirstVisibleIndex,
  getLastVisibleIndex,
  getRelativeToElementPos,
} from '../../../../helpers';
import { Point } from '../../../../types';
import {
  CanvasChartInput,
  CanvasChartOptions,
  CanvasChartStateWrapper,
} from '../../../types';
import { updateCanvasChart } from '../../update';
import { getEventArea } from './shared';
import { CanvasChartEventStateWrapper } from './types';

export function createHandlerDoubleClick(
  input: CanvasChartInput,
  options: CanvasChartOptions,
  stateWrapper: CanvasChartStateWrapper,
  _eventStateWrapper: CanvasChartEventStateWrapper,
): (event: MouseEvent) => void {
  return (event: MouseEvent): void => {
    const { layout, data, seriesPosition } = stateWrapper.state;

    const pos: Point = getRelativeToElementPos(event);
    const eventArea = getEventArea(pos, layout);

    if (eventArea !== 'y-axis') {
      return;
    }

    const firstIndex = getFirstVisibleIndex(seriesPosition, data.items.length);
    const lastIndex = getLastVisibleIndex(seriesPosition, data.items.length);

    let minPrice = Number.MAX_VALUE;
    let maxPrice = Number.MIN_VALUE;
    let hasData = false;

    for (let i = firstIndex; i <= lastIndex; i++) {
      const item = data.items[i];
      minPrice = Math.min(minPrice, item.low);
      maxPrice = Math.max(maxPrice, item.high);
      hasData = true;
    }

    if (!hasData) {
      return;
    }

    const midPrice = (minPrice + maxPrice) / 2;
    const priceSpan = (maxPrice - minPrice) / (1 - 2 * DATA_PADDING_FRACTION);

    stateWrapper.state = {
      ...stateWrapper.state,
      priceRange: {
        from: midPrice - priceSpan / 2,
        to: midPrice + priceSpan / 2,
      },
    };

    updateCanvasChart(input, options, stateWrapper);
  };
}

const DATA_PADDING_FRACTION = 0.1;
