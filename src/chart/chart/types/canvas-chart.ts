import { Size } from '../../types';
import { CanvasChartData } from './state/canvas-chart-data';

export interface CanvasChart {
  readonly initialize: () => void;
  readonly destroy: () => void;
  readonly resize: (size: Size) => void;
  readonly setData: (data: CanvasChartData) => void;
  readonly setTimezone: (timezone: string) => void;
}
