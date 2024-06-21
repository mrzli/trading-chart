import { getNextHigherValue } from '../shared';
import {
  LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES,
  TimeTickInterval,
} from '../../types';
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

const CUTOFFS = LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES.toReversed();
