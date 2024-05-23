import { describe, it, expect } from 'vitest';
import { TimeTickInterval } from '../types';
import { isoDateTimeToUnixSeconds } from '@gmjs/date-util';
import { getTimeTickPositionNext } from './time-tick-position-next';

describe('time-tick-position-next', () => {
  describe('getTimeTickPositionNext()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly time: number;
        readonly timezone: string;
        readonly interval: TimeTickInterval;
      };
      readonly expected: string;
    }

    const EXAMPLES: readonly Example[] = [
      // minute
      {
        description: 'm 1 (1) - exactly on minute',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 1 },
        },
        expected: '2020-01-01T00:01:00Z',
      },
      {
        description: 'm 1 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:00:30Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 1 },
        },
        expected: '2020-01-01T00:01:00Z',
      },
      {
        description: 'm 1 (3)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:59:30Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 1 },
        },
        expected: '2020-01-01T01:00:00Z',
      },
      {
        description: 'm 2 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 2 },
        },
        expected: '2020-01-01T00:18:00Z',
      },
      {
        description: 'm 3 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 3 },
        },
        expected: '2020-01-01T00:18:00Z',
      },
      {
        description: 'm 5 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 5 },
        },
        expected: '2020-01-01T00:20:00Z',
      },
      {
        description: 'm 10 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 10 },
        },
        expected: '2020-01-01T00:20:00Z',
      },
      {
        description: 'm 15 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 15 },
        },
        expected: '2020-01-01T00:30:00Z',
      },
      {
        description: 'm 30 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'UTC',
          interval: { unit: 'm', value: 30 },
        },
        expected: '2020-01-01T00:30:00Z',
      },
      {
        description: 'm 30 (2) - timezone',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:17:00Z'),
          timezone: 'Europe/Berlin', // 2020-01-01T01:17:00+01:00
          interval: { unit: 'm', value: 30 },
        },
        expected: '2020-01-01T00:30:00Z', // 2020-01-01T01:30:00+01:00
      },
      {
        description: 'm 30 (3) - timezone Asia/Kathmandu',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:02:00Z'),
          timezone: 'Asia/Kathmandu', // 2020-01-01T05:47:00+05:45
          interval: { unit: 'm', value: 30 },
        },
        expected: '2020-01-01T00:15:00Z', // 2020-01-01T06:00:00+05:45
      },
      // hour
      {
        description: 'h 1 (1) - exactly on hour',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 1 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 1 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 1 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 2 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 2 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 2 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 2 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 3 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 3 },
        },
        expected: '2020-01-01T09:00:00Z',
      },
      {
        description: 'h 4 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 4 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 4 (2) - DST change Winter -> Summer',
        input: {
          time: isoDateTimeToUnixSeconds('2023-03-25T23:30:00Z'),
          timezone: 'Europe/Berlin', // 2023-03-26T00:30:00+01:00
          interval: { unit: 'h', value: 4 },
        },
        expected: '2023-03-26T02:00:00Z', // 2023-03-26T04:00:00+02:00
      },
      {
        description: 'h 4 (3) - DST change Summer -> Winter',
        input: {
          time: isoDateTimeToUnixSeconds('2023-10-28T22:30:00Z'),
          timezone: 'Europe/Berlin', // 2020-10-29T00:30:00+02:00
          interval: { unit: 'h', value: 4 },
        },
        expected: '2023-10-29T03:00:00Z', // 2020-10-29T04:00:00+01:00
      },
      {
        description: 'h 6 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 6 },
        },
        expected: '2020-01-01T12:00:00Z',
      },
      {
        description: 'h 8 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 8 },
        },
        expected: '2020-01-01T08:00:00Z',
      },
      {
        description: 'h 12 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T07:30:00Z'),
          timezone: 'UTC',
          interval: { unit: 'h', value: 12 },
        },
        expected: '2020-01-01T12:00:00Z',
      },
      // day
      {
        description: 'D 1 (1) - exactly on day',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 1 },
        },
        expected: '2020-01-02T00:00:00Z',
      },
      {
        description: 'D 1 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 1 },
        },
        expected: '2020-01-02T00:00:00Z',
      },
      {
        description: 'D 1 (3)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-31T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 1 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description:
          'D 1 (4) - timezone is irrelevant for days, only UTC day is considered',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T22:00:00Z'),
          timezone: 'America/New_York', // 2020-01-02T03:00:00-05:00
          interval: { unit: 'D', value: 1 },
        },
        expected: '2020-01-02T00:00:00Z',
      },
      {
        description: 'D 2 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 2 },
        },
        expected: '2020-01-03T00:00:00Z',
      },
      {
        // if date is closer to the end of the month than the interval, that date is skipped
        description: 'D 2 (2) - end of month',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-29T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 2 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description: 'D 3 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 3 },
        },
        expected: '2020-01-04T00:00:00Z',
      },
      {
        // if date is closer to the end of the month than the interval, that date is skipped
        description: 'D 3 (2) - end of month',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-29T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 3 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description: 'D 7 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 7 },
        },
        expected: '2020-01-08T00:00:00Z',
      },
      {
        // if date is closer to the end of the month than the interval, that date is skipped
        description: 'D 7 (2) - end of month',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-23T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 7 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description: 'D 14 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T01:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 14 },
        },
        expected: '2020-01-15T00:00:00Z',
      },
      {
        // if date is closer to the end of the month than the interval, that date is skipped
        description: 'D 14 (2) - end of month',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-16T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'D', value: 14 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      // month
      {
        description: 'M 1 (1) - exactly on month',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'M', value: 1 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description: 'M 1 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-02T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'M', value: 1 },
        },
        expected: '2020-02-01T00:00:00Z',
      },
      {
        description: 'M 3 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-02T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'M', value: 3 },
        },
        expected: '2020-04-01T00:00:00Z',
      },
      {
        description: 'M 6 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-02T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'M', value: 6 },
        },
        expected: '2020-07-01T00:00:00Z',
      },
      {
        description: 'M 6 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-07-02T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'M', value: 6 },
        },
        expected: '2021-01-01T00:00:00Z',
      },
      // year
      {
        description: 'Y 1 (1) - exactly on year',
        input: {
          time: isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'Y', value: 1 },
        },
        expected: '2021-01-01T00:00:00Z',
      },
      {
        description: 'Y 1 (2)',
        input: {
          time: isoDateTimeToUnixSeconds('2020-02-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'Y', value: 1 },
        },
        expected: '2021-01-01T00:00:00Z',
      },
      {
        description: 'Y 2 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2021-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'Y', value: 2 },
        },
        expected: '2022-01-01T00:00:00Z',
      },
      {
        description: 'Y 4 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2021-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'Y', value: 4 },
        },
        expected: '2024-01-01T00:00:00Z',
      },
      {
        description: 'Y 5 (1)',
        input: {
          time: isoDateTimeToUnixSeconds('2021-01-01T00:00:00Z'),
          timezone: 'UTC',
          interval: { unit: 'Y', value: 5 },
        },
        expected: '2025-01-01T00:00:00Z',
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { time, timezone, interval } = example.input;

        const expected = isoDateTimeToUnixSeconds(example.expected);

        const actual = getTimeTickPositionNext(time, timezone, interval);
        expect(actual).toEqual(expected);
      });
    }
  });
});
