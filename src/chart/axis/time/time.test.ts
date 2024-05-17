import { expect, describe, it } from 'vitest';
import { range } from '@gmjs/array-create';
import { SeriesPosition, Ohlc, Interval } from '../../types';
import { getTimeAxisTickValues } from './time';
import { TickValue } from '../types';

describe.skip('time', () => {
  describe('getTimeAxisTickValues()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly position: SeriesPosition;
        readonly axisLength: number;
        readonly data: readonly Ohlc[];
        readonly interval: Interval;
        readonly timezone: string;
      };
      readonly expected: readonly TickValue[];
    }

    const START_TIMESTAMP = 1_704_067_200; // 2024-01-01T00:00:00Z
    const INTERVAL = 300;

    const DATA = getTestData(START_TIMESTAMP, INTERVAL);

    const EXAMPLES: readonly Example[] = [
      {
        description: 'simple',
        input: {
          position: {
            rightItemOffset: 111.5,
            itemSpan: 32.2,
          },
          axisLength: 1000,
          data: DATA,
          interval: {
            unit: 'm',
            value: 5,
          },
          timezone: 'UTC',
        },
        expected: [
          { value: START_TIMESTAMP + 81 * INTERVAL, offset: 68 },
          { value: START_TIMESTAMP + 84 * INTERVAL, offset: 161 },
          { value: START_TIMESTAMP + 87 * INTERVAL, offset: 255 },
          { value: START_TIMESTAMP + 90 * INTERVAL, offset: 348 },
          { value: START_TIMESTAMP + 93 * INTERVAL, offset: 441 },
          { value: START_TIMESTAMP + 96 * INTERVAL, offset: 534 },
          { value: START_TIMESTAMP + 99 * INTERVAL, offset: 627 },
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { position, axisLength, data, interval, timezone } =
          example.input;

        const actual = getTimeAxisTickValues(
          position,
          axisLength,
          data,
          interval,
          timezone,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});

function getTestData(
  startTimestamp: number,
  interval: number,
): readonly Ohlc[] {
  const dataItem: Omit<Ohlc, 'time'> = {
    open: 100,
    high: 100,
    low: 100,
    close: 100,
    volume: 100,
  };

  const data: readonly Ohlc[] = range(0, 100).map((i) => ({
    time: startTimestamp + i * interval,
    ...dataItem,
  }));

  return data;
}
