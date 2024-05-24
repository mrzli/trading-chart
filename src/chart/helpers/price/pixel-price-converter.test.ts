import { describe, it, expect } from 'vitest';
import { Range } from '../../types';
import { pixelToPrice, priceToPixel } from './pixel-price-converter';

describe('pixel-price-converter', () => {
  const RANGE: Range = { from: 1000, to: 5000 };
  const AXIS_LENGTH = 1000;

  describe('pixelToPrice()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly pixelPosition: number;
        readonly axisLength: number;
        readonly priceRange: Range;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'top of the axis',
        input: {
          pixelPosition: 0,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 5000,
      },
      {
        description: 'bottom of the axis',
        input: {
          pixelPosition: 1000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 1000,
      },
      {
        description: 'middle of the axis',
        input: {
          pixelPosition: 500,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 3000,
      },
      {
        description: 'above the axis',
        input: {
          pixelPosition: -500,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 7000,
      },
      {
        description: 'below the axis',
        input: {
          pixelPosition: 1500,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: -1000,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { pixelPosition, axisLength, priceRange } = example.input;

        const actual = pixelToPrice(pixelPosition, axisLength, priceRange);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('priceToPixel()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly price: number;
        readonly axisLength: number;
        readonly priceRange: Range;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        description: 'top of the range',
        input: {
          price: 5000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 0,
      },
      {
        description: 'bottom of the range',
        input: {
          price: 1000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 1000,
      },
      {
        description: 'middle of the range',
        input: {
          price: 3000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 500,
      },
      {
        description: 'above the range',
        input: {
          price: 7000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: -500,
      },
      {
        description: 'below the range',
        input: {
          price: -1000,
          axisLength: AXIS_LENGTH,
          priceRange: RANGE,
        },
        expected: 1500,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { price, axisLength, priceRange } = example.input;

        const actual = priceToPixel(price, axisLength, priceRange);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
