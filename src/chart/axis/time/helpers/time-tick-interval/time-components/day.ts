import { Interval } from '../../../../../types';
import { getNextHigherValue } from '../shared';
import { getNextHigherIntervalFromMonths } from './month';

export function getNextHigherIntervalFromDays(input: number): Interval {
  if (input > 14) {
    return getNextHigherIntervalFromMonths(input / 28);
  }

  const result = getNextHigherValue(input, CUTOFFS, 14);

  const value = Math.max(result, 1);

  return {
    unit: 'D',
    value,
  };
}

const CUTOFFS: readonly number[] = [14, 7, 3, 2, 1];
