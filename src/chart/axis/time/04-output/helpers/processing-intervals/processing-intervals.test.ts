import { describe, expect, it } from 'vitest';
import { TimeTickInterval } from '../../../types';
import { getTimeAxisProcessingIntervals } from '.';

describe('processing-intervals', () => {
  describe('getTimeAxisProcessingIntervals()', () => {
    interface Example {
      readonly input: {
        readonly from: TimeTickInterval;
        readonly to: TimeTickInterval;
      };
      readonly expected: readonly TimeTickInterval[];
    }

    function toDescription(example: Example): string {
      const { input } = example;
      const { from, to } = input;

      return `${from.value} ${from.unit} -> ${to.value} ${to.unit}`;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          from: {
            unit: 'Y',
            value: 1,
          },
          to: {
            unit: 'Y',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 10,
          },
          to: {
            unit: 'Y',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 10,
          },
          {
            unit: 'Y',
            value: 5,
          },
          {
            unit: 'Y',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 5,
          },
          to: {
            unit: 'Y',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 5,
          },
          {
            unit: 'Y',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 2,
          },
          to: {
            unit: 'Y',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 2,
          },
          {
            unit: 'Y',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 200,
          },
          to: {
            unit: 'Y',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 200,
          },
          {
            unit: 'Y',
            value: 100,
          },
          {
            unit: 'Y',
            value: 50,
          },
          {
            unit: 'Y',
            value: 10,
          },
          {
            unit: 'Y',
            value: 5,
          },
          {
            unit: 'Y',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 2,
          },
          to: {
            unit: 'M',
            value: 6,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 2,
          },
          {
            unit: 'Y',
            value: 1,
          },
          {
            unit: 'M',
            value: 6,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'M',
            value: 6,
          },
          to: {
            unit: 'M',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'M',
            value: 6,
          },
          {
            unit: 'M',
            value: 3,
          },
          {
            unit: 'M',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'M',
            value: 3,
          },
          to: {
            unit: 'M',
            value: 3,
          },
        },
        expected: [
          {
            unit: 'M',
            value: 3,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'M',
            value: 3,
          },
          to: {
            unit: 'D',
            value: 14,
          },
        },
        expected: [
          {
            unit: 'M',
            value: 3,
          },
          {
            unit: 'M',
            value: 1,
          },
          {
            unit: 'D',
            value: 14,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'D',
            value: 7,
          },
          to: {
            unit: 'D',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'D',
            value: 7,
          },
          {
            unit: 'D',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'D',
            value: 7,
          },
          to: {
            unit: 'h',
            value: 12,
          },
        },
        expected: [
          {
            unit: 'D',
            value: 7,
          },
          {
            unit: 'D',
            value: 1,
          },
          {
            unit: 'h',
            value: 12,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'h',
            value: 12,
          },
          to: {
            unit: 'h',
            value: 3,
          },
        },
        expected: [
          {
            unit: 'h',
            value: 12,
          },
          {
            unit: 'h',
            value: 6,
          },
          {
            unit: 'h',
            value: 3,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'h',
            value: 8,
          },
          to: {
            unit: 'h',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'h',
            value: 8,
          },
          {
            unit: 'h',
            value: 4,
          },
          {
            unit: 'h',
            value: 2,
          },
          {
            unit: 'h',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'h',
            value: 2,
          },
          to: {
            unit: 'm',
            value: 30,
          },
        },
        expected: [
          {
            unit: 'h',
            value: 2,
          },
          {
            unit: 'h',
            value: 1,
          },
          {
            unit: 'm',
            value: 30,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'm',
            value: 30,
          },
          to: {
            unit: 'm',
            value: 3,
          },
        },
        expected: [
          {
            unit: 'm',
            value: 30,
          },
          {
            unit: 'm',
            value: 15,
          },
          {
            unit: 'm',
            value: 3,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'm',
            value: 30,
          },
          to: {
            unit: 'm',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'm',
            value: 30,
          },
          {
            unit: 'm',
            value: 15,
          },
          {
            unit: 'm',
            value: 5,
          },
          {
            unit: 'm',
            value: 1,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'm',
            value: 30,
          },
          to: {
            unit: 'm',
            value: 2,
          },
        },
        expected: [
          {
            unit: 'm',
            value: 30,
          },
          {
            unit: 'm',
            value: 10,
          },
          {
            unit: 'm',
            value: 2,
          },
        ],
      },
      {
        input: {
          from: {
            unit: 'Y',
            value: 1000,
          },
          to: {
            unit: 'm',
            value: 1,
          },
        },
        expected: [
          {
            unit: 'Y',
            value: 1000,
          },
          {
            unit: 'Y',
            value: 500,
          },
          {
            unit: 'Y',
            value: 100,
          },
          {
            unit: 'Y',
            value: 50,
          },
          {
            unit: 'Y',
            value: 10,
          },
          {
            unit: 'Y',
            value: 5,
          },
          {
            unit: 'Y',
            value: 1,
          },
          {
            unit: 'M',
            value: 6,
          },
          {
            unit: 'M',
            value: 3,
          },
          {
            unit: 'M',
            value: 1,
          },
          {
            unit: 'D',
            value: 14,
          },
          {
            unit: 'D',
            value: 7,
          },
          {
            unit: 'D',
            value: 1,
          },
          {
            unit: 'h',
            value: 8,
          },
          {
            unit: 'h',
            value: 4,
          },
          {
            unit: 'h',
            value: 2,
          },
          {
            unit: 'h',
            value: 1,
          },
          {
            unit: 'm',
            value: 30,
          },
          {
            unit: 'm',
            value: 15,
          },
          {
            unit: 'm',
            value: 5,
          },
          {
            unit: 'm',
            value: 1,
          },
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(toDescription(example), () => {
        const { from, to } = example.input;
        const actual = getTimeAxisProcessingIntervals(from, to);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
