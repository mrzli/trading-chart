import { Interval, Ohlc } from '../../../types';

export interface CanvasChartData {
  readonly items: readonly Ohlc[];
  readonly interval: Interval;
}
