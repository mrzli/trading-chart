import { Margin, Size } from '../../../types';
import { CanvasChartEventHandlers } from './canvas-chart-event-handlers';

export interface FinalCanvasChartOptions {
  readonly canvasSize: Size;
  readonly backgroundColor: string | undefined;
  readonly contentPadding: Margin;
  readonly xAxisAreaHeight: number;
  readonly yAxisAreaWidth: number;
  readonly eventHandlers: CanvasChartEventHandlers;
}
