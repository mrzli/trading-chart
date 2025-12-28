import { getNextHigherValue } from '../../../../../util';
import {
  LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES,
  TimeTickTimeframe,
} from '../../types';
import { getNextHigherTimeframeFromDays } from './day';

export function getNextHigherTimeframeFromHours(
  input: number,
): TimeTickTimeframe {
  if (input > 12) {
    return getNextHigherTimeframeFromDays(input / 24);
  }

  const result = getNextHigherValue(input, CUTOFFS, 12);

  return {
    unit: 'h',
    value: result,
  };
}

const CUTOFFS = LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES.toReversed();
