import { describe, it, expect } from 'vitest';
import { Interval } from '../../../../types';
import { getMinTimeTickInterval } from './time-tick-interval';

describe('time-tick-interval', () => {
  describe('getMinTimeTickInterval()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly itemSpan: number;
        readonly axisLength: number;
        readonly interval: Interval;
        readonly minTickDistance: number;
      };
      readonly expected: Interval;
    }

    const minTickDistance = 80;
    const minTickSpan = 60;
    const axisLength = minTickSpan * minTickDistance; // 4800

    const EXAMPLES: readonly Example[] = [
      // months
      {
        description: 'M 1, 1 month ticks',
        input: {
          itemSpan: minTickSpan / 6,
          axisLength,
          interval: {
            unit: 'M',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 1,
        },
      },
      {
        description: 'M 1, 3 month ticks',
        input: {
          itemSpan: minTickSpan * 1.1,
          axisLength,
          interval: {
            unit: 'M',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 3,
        },
      },
      {
        description: 'M 1, 6 month ticks',
        input: {
          itemSpan: minTickSpan * 4,
          axisLength,
          interval: {
            unit: 'M',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 6,
        },
      },
      {
        description: 'M 1, 1 year ticks',
        input: {
          itemSpan: minTickSpan * 8,
          axisLength,
          interval: {
            unit: 'M',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'Y',
          value: 1,
        },
      },
      {
        description: 'M 1, 2 year ticks',
        input: {
          itemSpan: minTickSpan * 13,
          axisLength,
          interval: {
            unit: 'M',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'Y',
          value: 2,
        },
      },
      // years
      {
        description: 'Y 1 - 1 year ticks',
        input: {
          itemSpan: minTickSpan / 6,
          axisLength,
          interval: {
            unit: 'Y',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'Y',
          value: 1,
        },
      },
      {
        description: 'Y 1 - exactly 4 y ticks',
        input: {
          itemSpan: minTickSpan * 4,
          axisLength,
          interval: {
            unit: 'Y',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'Y',
          value: 4,
        },
      },
      {
        description: 'Y 1 - 5 year ticks',
        input: {
          itemSpan: minTickSpan * 4.5,
          axisLength,
          interval: {
            unit: 'Y',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'Y',
          value: 5,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { itemSpan, axisLength, interval, minTickDistance } =
          example.input;
        const actual = getMinTimeTickInterval(
          itemSpan,
          axisLength,
          interval,
          minTickDistance,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
