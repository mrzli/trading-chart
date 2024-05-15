import { expect, describe, it } from 'vitest';
import { getNumIntegerDigits } from './math';

describe('math', () => {
  describe('getNumIntegerDigits()', () => {
    interface Example {
      readonly input: number;
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: 0,
        expected: 1,
      },
      {
        input: 0.1,
        expected: 1,
      },
      {
        input: 1,
        expected: 1,
      },
      {
        input: 9,
        expected: 1,
      },
      {
        input: 10,
        expected: 2,
      },
      {
        input: 99,
        expected: 2,
      },
      {
        input: 100,
        expected: 3,
      },
      {
        input: 100.412_412,
        expected: 3,
      },
      {
        input: 999_999,
        expected: 6,
      },
      {
        input: -0,
        expected: 1,
      },
      {
        input: -0.1,
        expected: 1,
      },
      {
        input: -1,
        expected: 1,
      },
      {
        input: -10,
        expected: 2,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const actual = getNumIntegerDigits(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
