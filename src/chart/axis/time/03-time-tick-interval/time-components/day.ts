import { getNextHigherValue } from '../shared';
import { TimeTickInterval } from '../../types';
import { getNextHigherIntervalFromMonths } from './month';

export function getNextHigherIntervalFromDays(input: number): TimeTickInterval {
  if (input > 14) {
    return getNextHigherIntervalFromMonths(input / 28);
  }

  const result = getNextHigherValue(input, CUTOFFS, 14);

  return {
    unit: 'D',
    value: result,
  };
}

const CUTOFFS = [14, 7, 3, 2, 1] as const;
