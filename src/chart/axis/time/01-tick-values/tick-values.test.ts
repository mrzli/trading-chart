import { expect, describe, it } from 'vitest';
import { Ohlc } from '../../../types';
import { getTimeAxisTickValueData } from './tick-values';
import { range } from '@gmjs/array-create';
import { TimeAxisInput, TimeAxisTickValueData } from '../types';

describe('tick-values', () => {
  describe('getTimeAxisTickValueData()', () => {
    interface Example {
      readonly description: string;
      readonly input: TimeAxisInput;
      readonly expected: TimeAxisTickValueData;
    }

    const START_TIMESTAMP = 1_704_067_200; // 2024-01-01T00:00:00Z
    const INTERVAL = 300;

    const DEFAULT_INPUT: TimeAxisInput = {
      minTickDistance: 50,
      position: {
        rightItemOffset: 100,
        itemSpan: 100,
      },
      axisLength: 1000,
      data: [],
      interval: {
        unit: 'm',
        value: 1,
      },
      timezone: 'UTC',
    };

    const DATA = getTestData(START_TIMESTAMP, INTERVAL);

    const EXAMPLES: readonly Example[] = [
      {
        description: 'empty data',
        input: {
          ...DEFAULT_INPUT,
          position: {
            rightItemOffset: 111.5,
            itemSpan: 32.2,
          },
          axisLength: 1000,
          data: [],
        },
        expected: {
          beforeFirstTime: undefined,
          tickValues: [],
        },
      },
      {
        description: 'simple',
        input: {
          ...DEFAULT_INPUT,
          position: {
            rightItemOffset: 111.5,
            itemSpan: 32.2,
          },
          axisLength: 1000,
          data: DATA,
        },
        expected: {
          beforeFirstTime: START_TIMESTAMP + 78 * INTERVAL,
          tickValues: [
            { value: START_TIMESTAMP + 79 * INTERVAL, offset: 6 },
            { value: START_TIMESTAMP + 80 * INTERVAL, offset: 37 },
            { value: START_TIMESTAMP + 81 * INTERVAL, offset: 68 },
            { value: START_TIMESTAMP + 82 * INTERVAL, offset: 99 },
            { value: START_TIMESTAMP + 83 * INTERVAL, offset: 130 },
            { value: START_TIMESTAMP + 84 * INTERVAL, offset: 161 },
            { value: START_TIMESTAMP + 85 * INTERVAL, offset: 193 },
            { value: START_TIMESTAMP + 86 * INTERVAL, offset: 224 },
            { value: START_TIMESTAMP + 87 * INTERVAL, offset: 255 },
            { value: START_TIMESTAMP + 88 * INTERVAL, offset: 286 },
            { value: START_TIMESTAMP + 89 * INTERVAL, offset: 317 },
            { value: START_TIMESTAMP + 90 * INTERVAL, offset: 348 },
            { value: START_TIMESTAMP + 91 * INTERVAL, offset: 379 },
            { value: START_TIMESTAMP + 92 * INTERVAL, offset: 410 },
            { value: START_TIMESTAMP + 93 * INTERVAL, offset: 441 },
            { value: START_TIMESTAMP + 94 * INTERVAL, offset: 472 },
            { value: START_TIMESTAMP + 95 * INTERVAL, offset: 503 },
            { value: START_TIMESTAMP + 96 * INTERVAL, offset: 534 },
            { value: START_TIMESTAMP + 97 * INTERVAL, offset: 565 },
            { value: START_TIMESTAMP + 98 * INTERVAL, offset: 596 },
            { value: START_TIMESTAMP + 99 * INTERVAL, offset: 627 },
          ],
        },
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const actual = getTimeAxisTickValueData(example.input);
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
