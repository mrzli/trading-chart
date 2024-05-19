import { describe, it, expect } from 'vitest';
import {
  getNextHigherValue,
  getNextHigherValueWithOrderOfMagnitude,
} from './shared';

describe('shared', () => {
  describe('getNextHigherValue()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly value: number;
        readonly cutoffs: readonly number[];
        readonly maxValue: number;
      };
      readonly expected: number;
    }

    const CUTOFFS: readonly number[] = [5, 4, 2, 1];

    const EXAMPLES: readonly Example[] = [
      {
        description: '1',
        input: {
          value: 1,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 1,
      },
      {
        description: '1.1',
        input: {
          value: 1.1,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 2,
      },
      {
        description: '2',
        input: {
          value: 2,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 2,
      },
      {
        description: '2.1',
        input: {
          value: 2.1,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 4,
      },
      {
        description: '4',
        input: {
          value: 4,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 4,
      },
      {
        description: '4.1',
        input: {
          value: 4.1,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 5,
      },
      {
        description: '5',
        input: {
          value: 5,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 5,
      },
      {
        description: '5.1',
        input: {
          value: 5.1,
          cutoffs: CUTOFFS,
          maxValue: 10,
        },
        expected: 10,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { value, cutoffs, maxValue } = example.input;

        const actual = getNextHigherValue(value, cutoffs, maxValue);
        expect(actual).toEqual(example.expected);
      });
    }
  });

  describe('getNextHigherValueWithOrderOfMagnitude()', () => {
    interface Example {
      readonly description: string;
      readonly input: {
        readonly normalizedValue: number;
        readonly orderOfMagnitude: number;
        readonly cutoffs: readonly number[];
      };
      readonly expected: number;
    }

    const CUTOFFS: readonly number[] = [5, 4, 2, 1];

    const EXAMPLES: readonly Example[] = [
      {
        description: '1.1',
        input: {
          normalizedValue: 1.1,
          orderOfMagnitude: 1,
          cutoffs: CUTOFFS,
        },
        expected: 2,
      },
      {
        description: '1.2, orderOfMagnitude 10',
        input: {
          normalizedValue: 1.2,
          orderOfMagnitude: 10,
          cutoffs: CUTOFFS,
        },
        expected: 20,
      },
      {
        description: '1.2, orderOfMagnitude 0.1',
        input: {
          normalizedValue: 1.2,
          orderOfMagnitude: 0.1,
          cutoffs: CUTOFFS,
        },
        expected: 0.2,
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const { normalizedValue, orderOfMagnitude, cutoffs } = example.input;
        const actual = getNextHigherValueWithOrderOfMagnitude(
          normalizedValue,
          orderOfMagnitude,
          cutoffs,
        );
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
