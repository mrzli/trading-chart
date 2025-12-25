import {
  RenderTradingChartInputExact,
  RenderTradingChartResult,
} from '../types';

export function renderTradingChartExact(
  input: RenderTradingChartInputExact,
): RenderTradingChartResult {
  return {
    batch: { kind: 'batch', items: [] },
  };
}
