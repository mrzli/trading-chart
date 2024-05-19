import { Interval } from '../../../../../types';
import { getNextHigherValue } from '../shared';
import { getNextHigherIntervalFromYears } from './year';

export function getNextHigherIntervalFromMonths(input: number): Interval {
  if (input > 6) {
    return getNextHigherIntervalFromYears(input / 12);
  }

  const result = getNextHigherValue(input, CUTOFFS, 12);

  const value = Math.max(result, 1);

  return {
    unit: 'M',
    value,
  };
}

const CUTOFFS: readonly number[] = [6, 3, 1];
