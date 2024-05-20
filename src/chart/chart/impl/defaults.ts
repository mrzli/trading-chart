import { getChartAreas } from '../../helpers';
import { Size } from '../../types';
import { CanvasChartState } from '../types';

export function getInitialCanvasChartState(): CanvasChartState {
  const size: Size = { width: 100, height: 100 };
  const xAxisHeight = 20;
  const yAxisWidth = 20;

  const layout = getChartAreas(size, xAxisHeight, yAxisWidth);

  return {
    size,
    layout,
    data: {
      items: [],
      interval: { unit: 'D', value: 1 },
    },
    timezone: 'UTC',
    seriesPosition: { rightItemOffset: 505.55, itemSpan: 152.2 },
    priceRange: { from: 15_050, to: 15_130 },
  };
}
