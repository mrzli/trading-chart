import { describe, it, expect } from 'bun:test';
import {
  pixelToNumericValue,
  numericValueToPixel,
} from '@/chart';
import { Range } from '@/types';

describe('pixel-numeric-converter', () => {
  const RANGE: Range = { from: 1000, to: 5000 };
  const AXIS_LENGTH = 1000;

  describe('pixelToNumericValue()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly pixelPosition: number;
        readonly axisLength: number;
        readonly range: Range;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'top of the axis',
        input: {
          pixelPosition: 0,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 5000,
      },
      {
        description: 'bottom of the axis',
        input: {
          pixelPosition: 1000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 1000,
      },
      {
        description: 'middle of the axis',
        input: {
          pixelPosition: 500,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 3000,
      },
      {
        description: 'above the axis',
        input: {
          pixelPosition: -500,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 7000,
      },
      {
        description: 'below the axis',
        input: {
          pixelPosition: 1500,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: -1000,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { pixelPosition, axisLength, range } = example.input;

        const actual = pixelToNumericValue(pixelPosition, axisLength, range);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('numericValueToPixel()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly numericValue: number;
        readonly axisLength: number;
        readonly range: Range;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'top of the range',
        input: {
          numericValue: 5000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 0,
      },
      {
        description: 'bottom of the range',
        input: {
          numericValue: 1000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 1000,
      },
      {
        description: 'middle of the range',
        input: {
          numericValue: 3000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 500,
      },
      {
        description: 'above the range',
        input: {
          numericValue: 7000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: -500,
      },
      {
        description: 'below the range',
        input: {
          numericValue: -1000,
          axisLength: AXIS_LENGTH,
          range: RANGE,
        },
        expected: 1500,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { numericValue, axisLength, range } = example.input;

        const actual = numericValueToPixel(numericValue, axisLength, range);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
