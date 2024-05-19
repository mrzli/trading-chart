import { Interval } from '../../../../../types';
import { getNextHigherValue } from '../shared';
import { getNextHigherIntervalFromHours } from './hour';

export function getNextHigherIntervalFromMinutes(input: number): Interval {
  if (input > 30) {
    return getNextHigherIntervalFromHours(input / 60);
  }

  const result = getNextHigherValue(input, CUTOFFS, 30);

  const value = Math.max(result, 1);

  return {
    unit: 'm',
    value,
  };
}

const CUTOFFS: readonly number[] = [30, 15, 10, 5, 3, 2, 1];
