import { Interval } from '../../../../../types';
import { getNextHigherValue } from '../shared';
import { getNextHigherIntervalFromDays } from './day';

export function getNextHigherIntervalFromHours(input: number): Interval {
  if (input > 12) {
    return getNextHigherIntervalFromDays(input / 24);
  }

  const result = getNextHigherValue(input, CUTOFFS, 12);

  const value = Math.max(result, 1);

  return {
    unit: 'h',
    value,
  };
}

const CUTOFFS: readonly number[] = [12, 8, 6, 4, 3, 2, 1];
