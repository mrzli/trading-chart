import { ChartAreas } from '../../../helpers';
import { Range, SeriesPosition, Size } from '../../../types';
import { CanvasChartCursorState } from './canvas-chart-cursor-state';
import { CanvasChartData } from './canvas-chart-data';

export interface CanvasChartState {
  readonly size: Size;
  readonly layout: ChartAreas;
  readonly data: CanvasChartData;
  readonly timezone: string;
  readonly seriesPosition: SeriesPosition;
  readonly priceRange: Range;
  readonly pricePrecision: number;
  readonly cursorState: CanvasChartCursorState | undefined;
}
