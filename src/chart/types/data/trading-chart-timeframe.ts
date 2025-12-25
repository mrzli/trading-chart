import { TradingChartTimeframeUnit } from './trading-chart-timeframe-unit';

export interface TradingChartTimeframe {
  readonly unit: TradingChartTimeframeUnit;
  readonly value: number;
}
