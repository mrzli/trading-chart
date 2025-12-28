import { getNextHigherValue } from '../../../../../util';
import {
  LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES,
  TimeTickTimeframe,
} from '../../types';
import { getNextHigherTimeframeFromHours } from './hour';

export function getNextHigherTimeframeFromMinutes(
  input: number,
): TimeTickTimeframe {
  if (input > 30) {
    return getNextHigherTimeframeFromHours(input / 60);
  }

  const result = getNextHigherValue(input, CUTOFFS, 30);

  return {
    unit: 'm',
    value: result,
  };
}

const CUTOFFS = LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES.toReversed();
