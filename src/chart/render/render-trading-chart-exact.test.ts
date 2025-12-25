import { describe, it, expect } from 'bun:test';
import {
  RenderTradingChartInputExact,
  RenderTradingChartResult,
} from '../types';
import { renderTradingChartExact } from './render-trading-chart-exact';

describe('render-trading-chart-exact', () => {
  describe('renderTradingChartExact()', () => {
    interface Example {
      readonly description: string;
      readonly input: RenderTradingChartInputExact;
      readonly expected: RenderTradingChartResult;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'default input',
        input: {},
        expected: {
          batch: { kind: 'batch', items: [] },
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const actual = renderTradingChartExact(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
