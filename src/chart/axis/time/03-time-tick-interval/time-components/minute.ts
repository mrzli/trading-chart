import { getNextHigherValue } from '../shared';
import {
  LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES,
  TimeTickInterval,
} from '../../types';
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

const CUTOFFS = LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES.toReversed();
