import { describe, expect, it } from 'bun:test';
import { Point } from '@/types';
import { isPointEqual } from '@/util';

describe('point', () => {
  describe('isPointEqual()', () => {
    interface Example {
      readonly input: {
        readonly a: Point;
        readonly b: Point;
      };
      readonly expected: boolean;
    }

    const EXAMPLES: readonly Example[] = [
      {
        input: {
          a: { x: 0, y: 0 },
          b: { x: 0, y: 0 },
        },
        expected: true,
      },
      {
        input: {
          a: { x: 1, y: 2 },
          b: { x: 1, y: 2 },
        },
        expected: true,
      },
      {
        input: {
          a: { x: 1, y: 0 },
          b: { x: 0, y: 0 },
        },
        expected: false,
      },
      {
        input: {
          a: { x: 0, y: 0 },
          b: { x: 0, y: 1 },
        },
        expected: false,
      },
      {
        input: {
          a: { x: 1, y: 0 },
          b: { x: 0, y: 1 },
        },
        expected: false,
      },
    ];

    for (const example of EXAMPLES) {
      it(JSON.stringify(example.input), () => {
        const { a, b } = example.input;
        const actual = isPointEqual(a, b);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
