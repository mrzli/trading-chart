import { DrawItem } from '../../../types';
import { TradingChartAreas, TradingChartInputExplicit } from '../core';

export interface PluginExecutionInput {
  readonly chartInput: TradingChartInputExplicit;
  readonly areas: TradingChartAreas;
  readonly batch: readonly DrawItem[];
  readonly context: Readonly<Record<string, any>>;
}
