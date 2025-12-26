import { DrawItem } from '../../../types';
import { TradingChartInputExplicit } from '../core';

export interface PluginExecutionInput {
  readonly chartInput: TradingChartInputExplicit;
  readonly batch: readonly DrawItem[];
  readonly context: Readonly<Record<string, any>>;
}
