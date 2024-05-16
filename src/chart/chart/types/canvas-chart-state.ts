import { ChartAreas } from '../../helpers';
import { Range, SeriesPosition, Size } from '../../types';
import { CanvasChartData } from './canvas-chart-data';

export interface CanvasChartState {
  readonly size: Size;
  readonly layout: ChartAreas;
  readonly data: CanvasChartData;
  readonly seriesPosition: SeriesPosition;
  readonly priceRange: Range;
}
