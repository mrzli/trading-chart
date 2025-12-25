import {
  RenderTradingChartInputExplicit,
  RenderTradingChartResult,
} from '../types';

export function renderTradingChartExplicit(
  input: RenderTradingChartInputExplicit,
): RenderTradingChartResult {
  return {
    batch: { kind: 'batch', items: [] },
  };
}
