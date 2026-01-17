import { describe, expect, it } from 'bun:test';
import { Margin } from '@/types';
import { isMarginEqual } from '@/util';

describe('margin', () => {
  describe('isMarginEqual()', () => {
    interface Example {
      readonly input: {
        readonly a: Margin;
        readonly b: Margin;
      };
      readonly expected: boolean;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          a: { left: 0, right: 0, top: 0, bottom: 0 },
          b: { left: 0, right: 0, top: 0, bottom: 0 },
        },
        expected: true,
      },
      {
        input: {
          a: { left: 10, right: 20, top: 30, bottom: 40 },
          b: { left: 10, right: 20, top: 30, bottom: 40 },
        },
        expected: true,
      },
      {
        input: {
          a: { left: 5, right: 5, top: 5, bottom: 5 },
          b: { left: 5, right: 5, top: 5, bottom: 5 },
        },
        expected: true,
      },
      {
        input: {
          a: { left: 10, right: 20, top: 30, bottom: 40 },
          b: { left: 10, right: 20, top: 30, bottom: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { left: 0, right: 0, top: 0, bottom: 0 },
          b: { left: 1, right: 0, top: 0, bottom: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { left: 0, right: 0, top: 0, bottom: 0 },
          b: { left: 0, right: 1, top: 0, bottom: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { left: 0, right: 0, top: 0, bottom: 0 },
          b: { left: 0, right: 0, top: 1, bottom: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { left: 10, right: 20, top: 30, bottom: 40 },
          b: { left: 40, right: 30, top: 20, bottom: 10 },
        },
        expected: false,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const { a, b } = example.input;
        const actual = isMarginEqual(a, b);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
