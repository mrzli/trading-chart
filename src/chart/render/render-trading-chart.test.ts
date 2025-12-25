import { describe, it, expect } from 'bun:test';
import { RenderTradingChartInput, RenderTradingChartResult } from '../types';
import { renderTradingChart } from './render-trading-chart';

describe('render-trading-chart', () => {
  describe('renderTradingChart()', () => {
    interface Example {
      readonly decscription: string;
      readonly input: RenderTradingChartInput | undefined;
      readonly expected: RenderTradingChartResult;
    }

    const EXAMPLES: readonly Example[] = [
      {
        decscription: 'default input',
        input: undefined,
        expected: {
          batch: { kind: 'batch', items: [] },
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.decscription, () => {
        const actual = renderTradingChart(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
