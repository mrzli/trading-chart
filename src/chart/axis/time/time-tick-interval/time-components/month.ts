import { getNextHigherValue } from '../shared';
import { TimeTickInterval } from '../types';
import { getNextHigherIntervalFromYears } from './year';

export function getNextHigherIntervalFromMonths(
  input: number,
): TimeTickInterval {
  if (input > 6) {
    return getNextHigherIntervalFromYears(input / 12);
  }

  const result = getNextHigherValue(input, CUTOFFS, 6);

  return {
    unit: 'M',
    value: result,
  };
}

const CUTOFFS = [6, 3, 1] as const;
