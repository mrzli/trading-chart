import { expect, describe, it } from 'vitest';
import { getMultipleGt, getMultipleGte, getNumIntegerDigits } from './math';

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

  describe('getMultipleGt()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly multiple: number;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 0,
          multiple: 1,
        },
        expected: 1,
      },
      {
        input: {
          value: 0.5,
          multiple: 1,
        },
        expected: 1,
      },
      {
        input: {
          value: 1,
          multiple: 1,
        },
        expected: 2,
      },
      {
        input: {
          value: 1,
          multiple: 2,
        },
        expected: 2,
      },
      {
        input: {
          value: 7,
          multiple: 3,
        },
        expected: 9,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, multiple } = example.input;

        const actual = getMultipleGt(value, multiple);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('getMultipleGte()', () => {
    interface Example {
      readonly input: {
        readonly value: number;
        readonly multiple: number;
      };
      readonly expected: number;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          value: 0,
          multiple: 1,
        },
        expected: 0,
      },
      {
        input: {
          value: 0.5,
          multiple: 1,
        },
        expected: 1,
      },
      {
        input: {
          value: 1,
          multiple: 1,
        },
        expected: 1,
      },
      {
        input: {
          value: 1,
          multiple: 2,
        },
        expected: 2,
      },
      {
        input: {
          value: 7,
          multiple: 3,
        },
        expected: 9,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example), () => {
        const { value, multiple } = example.input;

        const actual = getMultipleGte(value, multiple);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
