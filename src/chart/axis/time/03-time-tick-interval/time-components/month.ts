import { getNextHigherValue } from '../shared';
import {
  LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES,
  TimeTickInterval,
} from '../../types';
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

const CUTOFFS = LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES.toReversed();
