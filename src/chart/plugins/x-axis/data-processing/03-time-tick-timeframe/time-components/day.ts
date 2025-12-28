import { getNextHigherValue } from '../../../../../util';
import {
  LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES,
  TimeTickTimeframe,
} from '../../types';
import { getNextHigherTimeframeFromMonths } from './month';

export function getNextHigherTimeframeFromDays(
  input: number,
): TimeTickTimeframe {
  if (input > 14) {
    return getNextHigherTimeframeFromMonths(input / 28);
  }

  const result = getNextHigherValue(input, CUTOFFS, 14);

  return {
    unit: 'D',
    value: result,
  };
}

const CUTOFFS = LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES.toReversed();
