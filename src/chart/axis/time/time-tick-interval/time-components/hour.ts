import { getNextHigherValue } from '../shared';
import { TimeTickInterval } from '../types';
import { getNextHigherIntervalFromDays } from './day';

export function getNextHigherIntervalFromHours(
  input: number,
): TimeTickInterval {
  if (input > 12) {
    return getNextHigherIntervalFromDays(input / 24);
  }

  const result = getNextHigherValue(input, CUTOFFS, 12);

  return {
    unit: 'h',
    value: result,
  };
}

const CUTOFFS = [12, 8, 6, 4, 3, 2, 1] as const;
