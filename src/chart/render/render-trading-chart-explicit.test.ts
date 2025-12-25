import { describe, it, expect } from 'bun:test';
import {
  RenderTradingChartInputExplicit,
  RenderTradingChartResult,
} from '../types';
import { renderTradingChartExplicit } from './render-trading-chart-explicit';

describe('render-trading-chart-explicit', () => {
  describe('renderTradingChartExplicit()', () => {
    interface Example {
      readonly description: string;
      readonly input: RenderTradingChartInputExplicit;
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
        const actual = renderTradingChartExplicit(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
