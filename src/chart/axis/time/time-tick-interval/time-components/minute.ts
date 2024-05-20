import { getNextHigherValue } from '../shared';
import { TimeTickInterval } from '../../types';
import { getNextHigherIntervalFromHours } from './hour';

export function getNextHigherIntervalFromMinutes(
  input: number,
): TimeTickInterval {
  if (input > 30) {
    return getNextHigherIntervalFromHours(input / 60);
  }

  const result = getNextHigherValue(input, CUTOFFS, 30);

  return {
    unit: 'm',
    value: result,
  };
}

const CUTOFFS = [30, 15, 10, 5, 3, 2, 1] as const;
