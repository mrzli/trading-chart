import { describe, it, expect } from 'bun:test';
import { TradingChartInputExplicit, TradingChartResult } from '../types';
import { renderTradingChartExplicit } from './render-trading-chart-explicit';

describe('render-trading-chart-explicit', () => {
  describe('renderTradingChartExplicit()', () => {
    interface Example {
      readonly description: string;
      readonly input: TradingChartInputExplicit;
      readonly expected: TradingChartResult;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'default input',
        input: {
          size: { width: 800, height: 600 },
          layout: {
            padding: { top: 10, right: 10, bottom: 10, left: 10 },
            heights: [500],
            xAxisHeight: 20,
            yAxisWidth: 50,
          },
        },
        expected: {
          batch: {
            kind: 'batch',
            items: [
              { kind: 'clear', area: { x: 0, y: 0, width: 800, height: 600 } },
            ],
          },
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
