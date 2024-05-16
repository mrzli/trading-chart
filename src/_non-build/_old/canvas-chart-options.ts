import { Margin } from '../types/general';

export type AxisDimension = number | 'auto';

export interface CanvasChartOptions {
  readonly padding: Margin;
  readonly xAxisHeight: AxisDimension;
  readonly yAxisWidth: AxisDimension;
}
