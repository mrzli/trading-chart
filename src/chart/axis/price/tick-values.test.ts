import { expect, describe, it } from 'vitest';
import { getPriceAxisTickValues } from './tick-values';
import { TickValue } from '../types';
import { PriceAxisInput } from './types';

describe('tick-values', () => {
  describe('getPriceAxisTickValues()', () => {
    interface Example {
      readonly description: string;
      readonly input: PriceAxisInput;
      readonly expected: readonly TickValue[];
    }

    const MIN_TICK_DISTANCE = 30;

    const EXAMPLES: readonly Example[] = [
      {
        description: 'simple',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 100 },
          axisLength: 200,
          pricePrecision: 0,
        },
        expected: [
          { value: 0, offset: 200 },
          { value: 20, offset: 160 },
          { value: 40, offset: 120 },
          { value: 60, offset: 80 },
          { value: 80, offset: 40 },
          { value: 100, offset: 0 },
        ],
      },
      {
        description: 'inexact division',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 205, to: 299 },
          axisLength: 200,
          pricePrecision: 0,
        },
        expected: [
          { value: 220, offset: 168 },
          { value: 240, offset: 126 },
          { value: 260, offset: 83 },
          { value: 280, offset: 40 },
        ],
      },
      {
        description: 'fractional precision',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 1.050_12, to: 1.062_18 },
          axisLength: 200,
          pricePrecision: 5,
        },
        expected: [
          { value: 1.052, offset: 169 },
          { value: 1.054, offset: 136 },
          { value: 1.056, offset: 102 },
          { value: 1.058, offset: 69 },
          { value: 1.06, offset: 36 },
          { value: 1.062, offset: 3 },
        ],
      },
      {
        description: 'tick size 0.01',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 0.02 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 0.01, offset: 50 },
          { value: 0.02, offset: 0 },
        ],
      },
      {
        description: 'tick size 0.02',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 0.04 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 0.02, offset: 50 },
          { value: 0.04, offset: 0 },
        ],
      },
      {
        description: 'tick size 0.04',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 0.08 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 0.04, offset: 50 },
          { value: 0.08, offset: 0 },
        ],
      },
      {
        description: 'tick size 0.05',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 0.15 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 0.05, offset: 67 },
          { value: 0.1, offset: 33 },
          { value: 0.15, offset: 0 },
        ],
      },
      {
        description: 'tick size 0.05',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 0.15 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 0.05, offset: 67 },
          { value: 0.1, offset: 33 },
          { value: 0.15, offset: 0 },
        ],
      },
      {
        description: 'tick size 1',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 2 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 1, offset: 50 },
          { value: 2, offset: 0 },
        ],
      },
      {
        description: 'tick size 2',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 4 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 2, offset: 50 },
          { value: 4, offset: 0 },
        ],
      },
      {
        description: 'tick size 4',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 8 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 4, offset: 50 },
          { value: 8, offset: 0 },
        ],
      },
      {
        description: 'tick size 5',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 15 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 5, offset: 67 },
          { value: 10, offset: 33 },
          { value: 15, offset: 0 },
        ],
      },
      {
        description: 'tick size 10',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 20 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 10, offset: 50 },
          { value: 20, offset: 0 },
        ],
      },
      {
        description: 'tick size 20',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 40 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 20, offset: 50 },
          { value: 40, offset: 0 },
        ],
      },
      {
        description: 'tick size 25',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 80 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 25, offset: 69 },
          { value: 50, offset: 37 },
          { value: 75, offset: 6 },
        ],
      },
      {
        description: 'tick size 40',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 100 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 40, offset: 60 },
          { value: 80, offset: 20 },
        ],
      },
      {
        description: 'tick size 50',
        input: {
          minTickDistance: MIN_TICK_DISTANCE,
          range: { from: 0, to: 150 },
          axisLength: 100,
          pricePrecision: 5,
        },
        expected: [
          { value: 0, offset: 100 },
          { value: 50, offset: 67 },
          { value: 100, offset: 33 },
          { value: 150, offset: 0 },
        ],
      },
    ];

    for (const example of EXAMPLES) {
      it(example.description, () => {
        const actual = getPriceAxisTickValues(example.input);
        expect(actual).toEqual(example.expected);
      });
    }
  });
});
