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
      // hours
      {
        description: 'h 1, 1 hour ticks',
        input: {
          itemSpan: minTickSpan / 6,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 1,
        },
      },
      {
        description: 'h 1, 2 hour ticks',
        input: {
          itemSpan: minTickSpan * 1.5,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 2,
        },
      },
      {
        description: 'h 1, 3 hour ticks',
        input: {
          itemSpan: minTickSpan * 2.5,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 3,
        },
      },
      {
        description: 'h 1, 4 hour ticks',
        input: {
          itemSpan: minTickSpan * 3.5,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 4,
        },
      },
      {
        description: 'h 1, 6 hour ticks',
        input: {
          itemSpan: minTickSpan * 5,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 6,
        },
      },
      {
        description: 'h 1, 8 hour ticks',
        input: {
          itemSpan: minTickSpan * 7,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 8,
        },
      },
      {
        description: 'h 1, 12 hour ticks',
        input: {
          itemSpan: minTickSpan * 10,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'h',
          value: 12,
        },
      },
      {
        description: 'h 1, 1 day ticks',
        input: {
          itemSpan: minTickSpan * 15,
          axisLength,
          interval: {
            unit: 'h',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      {
        description: 'h 2, 1 day ticks',
        input: {
          itemSpan: minTickSpan * 7,
          axisLength,
          interval: {
            unit: 'h',
            value: 2,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      // days
      {
        description: 'D 1, 1 day ticks',
        input: {
          itemSpan: minTickSpan / 6,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      {
        description: 'D 1, 2 day ticks',
        input: {
          itemSpan: minTickSpan * 1.5,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 2,
        },
      },
      {
        description: 'D 1, 3 day ticks',
        input: {
          itemSpan: minTickSpan * 3,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 3,
        },
      },
      {
        description: 'D 1, 7 day ticks',
        input: {
          itemSpan: minTickSpan * 6,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 7,
        },
      },
      {
        description: 'D 1, 14 day ticks',
        input: {
          itemSpan: minTickSpan * 12,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 14,
        },
      },
      {
        description: 'D 1, 1 month ticks',
        input: {
          itemSpan: minTickSpan * 17,
          axisLength,
          interval: {
            unit: 'D',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 1,
        },
      },
      // weeks
      {
        description: 'W 1, 7 day ticks',
        input: {
          itemSpan: minTickSpan / 6,
          axisLength,
          interval: {
            unit: 'W',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 7,
        },
      },
      {
        description: 'W 1, 14 day ticks',
        input: {
          itemSpan: minTickSpan * 1.5,
          axisLength,
          interval: {
            unit: 'W',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'D',
          value: 14,
        },
      },
      {
        description: 'W 1, 1 month ticks',
        input: {
          itemSpan: minTickSpan * 2.5,
          axisLength,
          interval: {
            unit: 'W',
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
        description: 'W 1, 1 month ticks',
        input: {
          itemSpan: minTickSpan * 5,
          axisLength,
          interval: {
            unit: 'W',
            value: 1,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 3,
        },
      },
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
      {
        description: 'M 2, 6 month ticks',
        input: {
          itemSpan: minTickSpan * 2,
          axisLength,
          interval: {
            unit: 'M',
            value: 2,
          },
          minTickDistance,
        },
        expected: {
          unit: 'M',
          value: 6,
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
