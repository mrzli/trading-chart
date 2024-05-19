import { DateObjectTz } from '@gmjs/date-util';
import { describe, it, expect } from 'vitest';
import { dateObjectToWeekday } from './weekday';

describe('weekday', () => {
  describe('dateObjectToWeekday()', () => {
    const DEFAULT_DATE_OBJECT: DateObjectTz = {
      year: 2024,
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      timezone: 'UTC',
    };

    interface Example {
      readonly input: DateObjectTz;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          ...DEFAULT_DATE_OBJECT,
          day: 1,
        },
        expected: 1,
      },
      {
        input: {
          ...DEFAULT_DATE_OBJECT,
          day: 2,
        },
        expected: 2,
      },
      {
        input: {
          ...DEFAULT_DATE_OBJECT,
          day: 7,
        },
        expected: 7,
      },
      {
        input: {
          ...DEFAULT_DATE_OBJECT,
          day: 8,
        },
        expected: 1,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = dateObjectToWeekday(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  // it('weekdayToString() - performance', () => {
  //   const ITERATIONS = 1_000_000;
  //   const result = measurePeformanceTime(() => {
  //     for (let i = 0; i < ITERATIONS; i++) {
  //       dateObjectToWeekday({
  //         year: 2024,
  //         month: 1,
  //         day: i,
  //         hour: 0,
  //         minute: 0,
  //         second: 0,
  //         millisecond: 0,
  //         timezone: 'UTC',
  //       });
  //     }
  //   });

  //   console.log(`Execution time: ${result} ms`);
  // });
});
