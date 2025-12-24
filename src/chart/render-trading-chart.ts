import { RenderTradingChartInput, RenderTradingChartResult } from './types';

export function renderTradingChart(
  input?: RenderTradingChartInput,
): RenderTradingChartResult {
  return {
    batch: { kind: 'batch', items: [] },
  };
}
