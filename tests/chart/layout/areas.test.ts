import { describe, expect, it } from 'bun:test';
import { Size } from '../../../src/types';
import {
  TradingChartAreas,
  TradingChartLayout,
  TradingChartSegmentInputExplicit,
} from '../../../src/chart/types';
import { calculateTradingChartAreas } from '../../../src/chart/layout/areas';

describe('areas', () => {
  describe('calcuateTradingChartAreas()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly size: Size;
        readonly layout: TradingChartLayout;
        readonly segments: readonly TradingChartSegmentInputExplicit[];
      };
      readonly expected: TradingChartAreas;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'simple, no padding',
        input: {
          size: { width: 800, height: 600 },
          layout: {
            padding: { left: 0, right: 0, top: 0, bottom: 0 },
            xAxisHeight: 50,
            yAxisWidth: 100,
          },
          segments: [createSegment(500)],
        },
        expected: {
          entire: { x: 0, y: 0, width: 800, height: 600 },
          all: { x: 0, y: 0, width: 800, height: 600 },
          segments: [
            {
              main: { x: 0, y: 0, width: 700, height: 500 },
              yAxis: { x: 700, y: 0, width: 100, height: 500 },
            },
          ],
          xAxis: { x: 0, y: 550, width: 800, height: 50 },
          corner: { x: 700, y: 550, width: 100, height: 50 },
        },
      },
      {
        description: 'simple, with padding',
        input: {
          size: { width: 800, height: 600 },
          layout: {
            padding: { left: 10, right: 20, top: 30, bottom: 40 },
            xAxisHeight: 50,
            yAxisWidth: 100,
          },
          segments: [createSegment(500)],
        },
        expected: {
          entire: { x: 0, y: 0, width: 800, height: 600 },
          all: { x: 10, y: 30, width: 770, height: 530 },
          segments: [
            {
              main: { x: 10, y: 30, width: 670, height: 500 },
              yAxis: { x: 680, y: 30, width: 100, height: 500 },
            },
          ],
          xAxis: { x: 10, y: 510, width: 770, height: 50 },
          corner: { x: 680, y: 510, width: 100, height: 50 },
        },
      },
      {
        description: 'multiple mains',
        input: {
          size: { width: 1000, height: 800 },
          layout: {
            padding: { left: 15, right: 25, top: 35, bottom: 45 },
            xAxisHeight: 60,
            yAxisWidth: 120,
          },
          segments: [createSegment(300), createSegment(200)],
        },
        expected: {
          entire: { x: 0, y: 0, width: 1000, height: 800 },
          all: { x: 15, y: 35, width: 960, height: 720 },
          segments: [
            {
              main: { x: 15, y: 35, width: 840, height: 300 },
              yAxis: { x: 855, y: 35, width: 120, height: 300 },
            },
            {
              main: { x: 15, y: 335, width: 840, height: 200 },
              yAxis: { x: 855, y: 335, width: 120, height: 200 },
            },
          ],
          xAxis: { x: 15, y: 695, width: 960, height: 60 },
          corner: { x: 855, y: 695, width: 120, height: 60 },
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { size, layout, segments } = example.input;
        const actual = calculateTradingChartAreas(size, layout, segments);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});

const DEFAULT_SEGMENT_RANGE = { from: 0, to: 200 };

function createSegment(height: number): TradingChartSegmentInputExplicit {
  return { height, range: DEFAULT_SEGMENT_RANGE };
}
