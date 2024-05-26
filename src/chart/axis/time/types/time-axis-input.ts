import { Interval, Ohlc, SeriesPosition } from '../../../types';

export interface TimeAxisInput {
  readonly minTickDistance: number;
  readonly position: SeriesPosition;
  readonly axisLength: number;
  readonly data: readonly Ohlc[];
  readonly interval: Interval;
  readonly timezone: string;
}
