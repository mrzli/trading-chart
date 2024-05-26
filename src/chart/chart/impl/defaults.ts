import { getDefaultChartAreas } from '../../helpers';
import { Size } from '../../types';
import { CanvasChartState } from '../types';

export function getInitialCanvasChartState(): CanvasChartState {
  const size: Size = { width: 100, height: 100 };
  const layout = getDefaultChartAreas();

  return {
    size,
    layout,
    data: {
      items: [],
      interval: { unit: 'D', value: 1 },
    },
    timezone: 'UTC',
    seriesPosition: { rightItemOffset: 100, itemSpan: 120 },
    priceRange: { from: 0, to: 10_000 },
    pricePrecision: 1,
    cursorState: undefined,
  };
}
