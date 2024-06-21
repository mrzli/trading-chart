import { describe, it, expect } from 'vitest';
import { Interval } from '../../../types';
import { getMinTimeTickInterval } from './time-tick-interval';
import { TimeAxisInput } from '../types';

describe('time-tick-interval', () => {
  describe('getMinTimeTickInterval()', () => {
    interface Example {
      readonly description: string;
      readonly input: TimeAxisInput;
      readonly expected: Interval;
    }

    const minTickDistance = 80;
    const minTickSpan = 60;

    const DEFAULT_TIME_AXIS_INPUT: TimeAxisInput = {
      minTickDistance,
      position: {
        rightItemOffset: 100,
        itemSpan: minTickSpan,
      },
      axisLength: minTickSpan * minTickDistance, // 4800
      data: [],
      interval: {
        unit: 's',
        value: 1,
      },
      timezone: 'UTC',
    };

    interface PartialInput {
      readonly itemSpan: number;
      readonly interval: Interval;
    }

    function createInput(partial: PartialInput): TimeAxisInput {
      const { itemSpan, interval } = partial;

      return {
        ...DEFAULT_TIME_AXIS_INPUT,
        position: { ...DEFAULT_TIME_AXIS_INPUT.position, itemSpan },
        interval,
      };
    }

    const EXAMPLES: readonly Example[] = [
      // seconds
      {
        description: 's 1, 1 minute ticks (1)',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 's',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 1,
        },
      },
      {
        description: 's 1, 1 minute ticks (2)',
        input: createInput({
          itemSpan: minTickSpan * 20,
          interval: {
            unit: 's',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 1,
        },
      },
      {
        description: 's 1, 1 minute ticks (3)',
        input: createInput({
          itemSpan: minTickSpan * 40,
          interval: {
            unit: 's',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 1,
        },
      },
      {
        description: 's 1, 2 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 80,
          interval: {
            unit: 's',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 2,
        },
      },
      // minutes
      {
        description: 'm 1, 1 minute ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 1,
        },
      },
      {
        description: 'm 1, 2 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.5,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 2,
        },
      },
      {
        description: 'm 1, 3 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 2.5,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 3,
        },
      },
      {
        description: 'm 1, 5 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 4,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 5,
        },
      },
      {
        description: 'm 1, 10 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 7,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 10,
        },
      },
      {
        description: 'm 1, 15 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 12,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 15,
        },
      },
      {
        description: 'm 1, 30 minute ticks',
        input: createInput({
          itemSpan: minTickSpan * 20,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'm',
          value: 30,
        },
      },
      {
        description: 'm 1, 1 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 40,
          interval: {
            unit: 'm',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 1,
        },
      },
      // hours
      {
        description: 'h 1, 1 hour ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 1,
        },
      },
      {
        description: 'h 1, 2 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.5,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 2,
        },
      },
      {
        description: 'h 1, 3 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 2.5,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 3,
        },
      },
      {
        description: 'h 1, 4 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 3.5,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 4,
        },
      },
      {
        description: 'h 1, 6 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 5,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 6,
        },
      },
      {
        description: 'h 1, 8 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 7,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 8,
        },
      },
      {
        description: 'h 1, 12 hour ticks',
        input: createInput({
          itemSpan: minTickSpan * 10,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'h',
          value: 12,
        },
      },
      {
        description: 'h 1, 1 day ticks',
        input: createInput({
          itemSpan: minTickSpan * 15,
          interval: {
            unit: 'h',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      {
        description: 'h 2, 1 day ticks',
        input: createInput({
          itemSpan: minTickSpan * 7,
          interval: {
            unit: 'h',
            value: 2,
          },
        }),
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      // days
      {
        description: 'D 1, 1 day ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'D',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 1,
        },
      },
      {
        description: 'D 1, 7 day ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.5,
          interval: {
            unit: 'D',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 7,
        },
      },
      {
        description: 'D 1, 14 day ticks',
        input: createInput({
          itemSpan: minTickSpan * 12,
          interval: {
            unit: 'D',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 14,
        },
      },
      {
        description: 'D 1, 1 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 17,
          interval: {
            unit: 'D',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 1,
        },
      },
      // weeks
      {
        description: 'W 1, 7 day ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'W',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 7,
        },
      },
      {
        description: 'W 1, 14 day ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.5,
          interval: {
            unit: 'W',
            value: 1,
          },
        }),
        expected: {
          unit: 'D',
          value: 14,
        },
      },
      {
        description: 'W 1, 1 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 2.5,
          interval: {
            unit: 'W',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 1,
        },
      },
      {
        description: 'W 1, 1 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 5,
          interval: {
            unit: 'W',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 3,
        },
      },
      // months
      {
        description: 'M 1, 1 month ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'M',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 1,
        },
      },
      {
        description: 'M 1, 3 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.1,
          interval: {
            unit: 'M',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 3,
        },
      },
      {
        description: 'M 1, 6 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 4,
          interval: {
            unit: 'M',
            value: 1,
          },
        }),
        expected: {
          unit: 'M',
          value: 6,
        },
      },
      {
        description: 'M 1, 1 year ticks',
        input: createInput({
          itemSpan: minTickSpan * 8,
          interval: {
            unit: 'M',
            value: 1,
          },
        }),
        expected: {
          unit: 'Y',
          value: 1,
        },
      },
      {
        description: 'M 1, 2 year ticks',
        input: createInput({
          itemSpan: minTickSpan * 13,
          interval: {
            unit: 'M',
            value: 1,
          },
        }),
        expected: {
          unit: 'Y',
          value: 2,
        },
      },
      {
        description: 'M 2, 6 month ticks',
        input: createInput({
          itemSpan: minTickSpan * 2,
          interval: {
            unit: 'M',
            value: 2,
          },
        }),
        expected: {
          unit: 'M',
          value: 6,
        },
      },
      // years
      {
        description: 'Y 1 - 1 year ticks',
        input: createInput({
          itemSpan: minTickSpan / 6,
          interval: {
            unit: 'Y',
            value: 1,
          },
        }),
        expected: {
          unit: 'Y',
          value: 1,
        },
      },
      {
        description: 'Y 1 - 2 y ticks',
        input: createInput({
          itemSpan: minTickSpan * 1.5,
          interval: {
            unit: 'Y',
            value: 1,
          },
        }),
        expected: {
          unit: 'Y',
          value: 2,
        },
      },
      {
        description: 'Y 1 - 5 year ticks',
        input: createInput({
          itemSpan: minTickSpan * 4.5,
          interval: {
            unit: 'Y',
            value: 1,
          },
        }),
        expected: {
          unit: 'Y',
          value: 5,
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const actual = getMinTimeTickInterval(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
