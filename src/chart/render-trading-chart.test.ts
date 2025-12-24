import { describe, it, expect } from 'bun:test';
import { renderTradingChart } from './render-trading-chart';
import { RenderTradingChartInput, RenderTradingChartResult } from './types';

describe('render-trading-chart', () => {
  describe('renderTradingChart()', () => {
    interface Example {
      readonly input: RenderTradingChartInput | undefined;
      readonly expected: RenderTradingChartResult;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: undefined,
        expected: {
          batch: { kind: 'batch', items: [] },
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = renderTradingChart(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
