import { DrawItem } from '../../../types';
import { TradingChartInputExplicit } from '../trading-chart-input-explicit';

export interface PluginExecutionInput {
  readonly chartInput: TradingChartInputExplicit;
  readonly batch: readonly DrawItem[];
  readonly context: Readonly<Record<string, any>>;
}
