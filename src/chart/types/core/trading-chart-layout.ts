import { Margin } from '../../../types';

export interface TradingChartLayout {
  readonly padding: Margin;
  readonly heights: readonly number[];
  readonly xAxisHeight: number;
  readonly yAxisWidth: number;
}
