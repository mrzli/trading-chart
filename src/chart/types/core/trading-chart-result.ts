import { DrawItem } from '../../../types';

export interface TradingChartResult {
  readonly batch: readonly DrawItem[];
  readonly context: Readonly<Record<string, any>>;
}
