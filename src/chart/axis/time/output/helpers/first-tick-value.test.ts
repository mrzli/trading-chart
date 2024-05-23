import { describe, it, expect } from 'vitest';
import { TimeAxisExtendedDataItem, TimeTickInterval } from '../../types';
import { getFirstTickValue } from './first-tick-value';
import { DateObjectTz } from '@gmjs/date-util';

describe('first-tick-value', () => {
  describe('getFirstTickValue()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly extendedItems: readonly TimeAxisExtendedDataItem[];
        readonly interval: TimeTickInterval;
      };
      readonly expected: number;
    }

    const DEFAULT_ITEM: TimeAxisExtendedDataItem = {
      offset: 0,
      value: 0,
      dateObject: {
        year: 2020,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        timezone: 'UTC',
      },
      previousDateObject: undefined,
    };

    function getItems(
      changed: Partial<DateObjectTz>,
    ): readonly TimeAxisExtendedDataItem[] {
      return [
        {
          ...DEFAULT_ITEM,
          dateObject: {
            ...DEFAULT_ITEM.dateObject,
            ...changed,
          },
        },
      ];
    }

    const EXAMPLES: readonly Example[] = [
      // empty
      {
        description: 'empty items',
        input: {
          extendedItems: [],
          interval: {
            unit: 'D',
            value: 7,
          },
        },
        expected: 0,
      },
      // minute
      {
        description: 'm 1, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 1,
          },
        },
        expected: 7,
      },
      {
        description: 'm 1, 7:30',
        input: {
          extendedItems: getItems({ minute: 7, second: 30 }),
          interval: {
            unit: 'm',
            value: 1,
          },
        },
        expected: 8,
      },
      {
        description: 'm 2, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 2,
          },
        },
        expected: 8,
      },
      {
        description: 'm 3, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 3,
          },
        },
        expected: 9,
      },
      {
        description: 'm 5, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 5,
          },
        },
        expected: 10,
      },
      {
        description: 'm 10, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 10,
          },
        },
        expected: 10,
      },
      {
        description: 'm 15, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 15,
          },
        },
        expected: 15,
      },
      {
        description: 'm 30, 7',
        input: {
          extendedItems: getItems({ minute: 7 }),
          interval: {
            unit: 'm',
            value: 30,
          },
        },
        expected: 30,
      },
      {
        description: 'm 1, 59:30',
        input: {
          extendedItems: getItems({ minute: 59, second: 30 }),
          interval: {
            unit: 'm',
            value: 1,
          },
        },
        expected: 0,
      },
      {
        description: 'm 2, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 2,
          },
        },
        expected: 0,
      },
      {
        description: 'm 3, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 3,
          },
        },
        expected: 0,
      },
      {
        description: 'm 5, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 5,
          },
        },
        expected: 0,
      },
      {
        description: 'm 10, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 10,
          },
        },
        expected: 0,
      },
      {
        description: 'm 15, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 15,
          },
        },
        expected: 0,
      },
      {
        description: 'm 30, 59',
        input: {
          extendedItems: getItems({ minute: 59 }),
          interval: {
            unit: 'm',
            value: 30,
          },
        },
        expected: 0,
      },
      // hour
      {
        description: 'h 1, 7',
        input: {
          extendedItems: getItems({ hour: 7 }),
          interval: {
            unit: 'h',
            value: 1,
          },
        },
        expected: 7,
      },
      {
        description: 'h 4, 7',
        input: {
          extendedItems: getItems({ hour: 7 }),
          interval: {
            unit: 'h',
            value: 4,
          },
        },
        expected: 8,
      },
      {
        description: 'h 12, 14',
        input: {
          extendedItems: getItems({ hour: 14 }),
          interval: {
            unit: 'h',
            value: 12,
          },
        },
        expected: 0,
      },
      // day
      {
        description: 'D 1, 6',
        input: {
          extendedItems: getItems({ day: 6 }),
          interval: {
            unit: 'D',
            value: 1,
          },
        },
        expected: 6,
      },
      {
        description: 'D 2, 6',
        input: {
          extendedItems: getItems({ day: 6 }),
          interval: {
            unit: 'D',
            value: 2,
          },
        },
        expected: 7,
      },
      {
        description: 'D 3, 6',
        input: {
          extendedItems: getItems({ day: 6 }),
          interval: {
            unit: 'D',
            value: 3,
          },
        },
        expected: 7,
      },
      {
        description: 'D 7, 6',
        input: {
          extendedItems: getItems({ day: 6 }),
          interval: {
            unit: 'D',
            value: 7,
          },
        },
        expected: 8,
      },
      {
        description: 'D 14, 6',
        input: {
          extendedItems: getItems({ day: 6 }),
          interval: {
            unit: 'D',
            value: 14,
          },
        },
        expected: 15,
      },
      {
        description: 'D 14, 26',
        input: {
          extendedItems: getItems({ day: 26 }),
          interval: {
            unit: 'D',
            value: 14,
          },
        },
        expected: 28,
      },
      {
        description: 'D 14, 26 (Feb 2021)',
        input: {
          extendedItems: getItems({ year: 2021, month: 2, day: 26 }),
          interval: {
            unit: 'D',
            value: 14,
          },
        },
        expected: 1,
      },
      // month
      {
        description: 'M 3, 1',
        input: {
          extendedItems: getItems({ month: 1 }),
          interval: {
            unit: 'M',
            value: 1,
          },
        },
        expected: 1,
      },
      {
        description: 'M 3, 2',
        input: {
          extendedItems: getItems({ month: 2 }),
          interval: {
            unit: 'M',
            value: 3,
          },
        },
        expected: 4,
      },
      {
        description: 'M 3, 6',
        input: {
          extendedItems: getItems({ month: 6 }),
          interval: {
            unit: 'M',
            value: 3,
          },
        },
        expected: 7,
      },
      {
        description: 'M 6, 8',
        input: {
          extendedItems: getItems({ month: 8 }),
          interval: {
            unit: 'M',
            value: 6,
          },
        },
        expected: 1,
      },
      // year
      {
        description: 'Y 4, 2020',
        input: {
          extendedItems: getItems({ year: 2020 }),
          interval: {
            unit: 'Y',
            value: 4,
          },
        },
        expected: 2020,
      },
      {
        description: 'Y 4, 2021',
        input: {
          extendedItems: getItems({ year: 2021 }),
          interval: {
            unit: 'Y',
            value: 4,
          },
        },
        expected: 2024,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { extendedItems, interval } = example.input;

        const actual = getFirstTickValue(extendedItems, interval);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
