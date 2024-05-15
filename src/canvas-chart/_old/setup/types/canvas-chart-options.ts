import { Margin } from '../../../types';
import { CanvasChartEventHandlers } from './canvas-chart-event-handlers';

export interface CanvasChartOptions {
  readonly backgroundColor?: string;
  readonly contentPadding?: Margin;
  readonly xAxisAreaHeight?: number;
  readonly yAxisAreaWidth?: number;
  readonly eventHandlers?: CanvasChartEventHandlers;
}
