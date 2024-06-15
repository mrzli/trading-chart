import { describe, it, expect } from 'vitest';
import { SeriesPosition } from '../../types';
import {
  pixelToSeriesIndexFractional,
  seriesIndexFractionalToPixel,
} from './pixel-series-index-converter';

describe('pixel-series-index-converter', () => {
  const AXIS_LENGTH = 1000;
  const SERIES_POSITION: SeriesPosition = {
    rightItemOffset: 200,
    itemSpan: 100,
  };

  describe('pixelToSeriesIndexFractional()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly pixelPosition: number;
        readonly axisLength: number;
        readonly seriesPosition: SeriesPosition;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'left end of the axis',
        input: {
          pixelPosition: 0,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 100,
      },
      {
        description: 'right end of the axis',
        input: {
          pixelPosition: 1000,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 200,
      },
      {
        description: 'middle of the axis',
        input: {
          pixelPosition: 500,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 150,
      },
      {
        description: 'fractional index',
        input: {
          pixelPosition: 505,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 150.5,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { pixelPosition, axisLength, seriesPosition } = example.input;

        const actual = pixelToSeriesIndexFractional(
          pixelPosition,
          axisLength,
          seriesPosition,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('seriesIndexFractionalToPixel()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly seriesIndexFractional: number;
        readonly axisLength: number;
        readonly seriesPosition: SeriesPosition;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'leftmost position',
        input: {
          seriesIndexFractional: 100,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 0,
      },
      {
        description: 'rightmost position',
        input: {
          seriesIndexFractional: 200,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 1000,
      },
      {
        description: 'middle position',
        input: {
          seriesIndexFractional: 150,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 500,
      },
      {
        description: 'fractional index',
        input: {
          seriesIndexFractional: 150.5,
          axisLength: AXIS_LENGTH,
          seriesPosition: SERIES_POSITION,
        },
        expected: 505,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { seriesIndexFractional, axisLength, seriesPosition } =
          example.input;

        const actual = seriesIndexFractionalToPixel(
          seriesIndexFractional,
          axisLength,
          seriesPosition,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
