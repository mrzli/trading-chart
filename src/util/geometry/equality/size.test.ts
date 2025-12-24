import { describe, expect, it } from 'bun:test';
import { Size } from '../../../types';
import { isSizeEqual } from './size';

describe('size', () => {
  describe('isPointEqual()', () => {
    interface Example {
      readonly input: {
        readonly a: Size;
        readonly b: Size;
      };
      readonly expected: boolean;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          a: { width: 0, height: 0 },
          b: { width: 0, height: 0 },
        },
        expected: true,
      },
      {
        input: {
          a: { width: 1, height: 2 },
          b: { width: 1, height: 2 },
        },
        expected: true,
      },
      {
        input: {
          a: { width: 1, height: 0 },
          b: { width: 0, height: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { width: 0, height: 0 },
          b: { width: 0, height: 1 },
        },
        expected: false,
      },
      {
        input: {
          a: { width: 1, height: 0 },
          b: { width: 0, height: 1 },
        },
        expected: false,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const { a, b } = example.input;
        const actual = isSizeEqual(a, b);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
