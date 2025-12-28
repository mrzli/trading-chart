import { getNextHigherValue } from '../../../../../util';
import {
  LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES,
  TimeTickTimeframe,
} from '../../types';
import { getNextHigherTimeframeFromYears } from './year';

export function getNextHigherTimeframeFromMonths(
  input: number,
): TimeTickTimeframe {
  if (input > 6) {
    return getNextHigherTimeframeFromYears(input / 12);
  }

  const result = getNextHigherValue(input, CUTOFFS, 6);

  return {
    unit: 'M',
    value: result,
  };
}

const CUTOFFS = LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES.toReversed();
