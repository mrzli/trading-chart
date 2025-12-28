import { Ohlc, SeriesPosition, TradingChartTimeframe } from '../../../../types';

export interface TimeAxisInput {
  readonly minTickDistance: number;
  readonly position: SeriesPosition;
  readonly axisLength: number;
  readonly data: readonly Ohlc[];
  readonly timeframe: TradingChartTimeframe;
  readonly timezone: string;
}
