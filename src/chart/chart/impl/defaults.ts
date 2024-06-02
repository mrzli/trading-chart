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
    seriesPosition: { rightItemOffset: 950, itemSpan: 120 },
    priceRange: { from: 181.6, to: 184.2 },
    pricePrecision: 1,
    cursorState: undefined,
  };
}
