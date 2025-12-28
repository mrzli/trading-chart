import { DateObjectTz } from '@gmjs/date-util';
import { TimeAxisInput, TimeTickTimeframe } from '../../types';
import {
  getTimeAxisProcessingTimeframeRangeInternal,
  getTimeAxisProcessingTimeframes,
} from './processing-timeframes';

export function getTimeAxisProcessingTimeframeRange(
  timeTickTimeframe: TimeTickTimeframe,
  dataTimeframe: TimeAxisInput['timeframe'],
  dateBeforeFirst: DateObjectTz | undefined,
  dateLast: DateObjectTz,
): readonly TimeTickTimeframe[] {
  const [from, to] = getTimeAxisProcessingTimeframeRangeInternal(
    timeTickTimeframe,
    dataTimeframe,
    dateBeforeFirst,
    dateLast,
  );

  const result = getTimeAxisProcessingTimeframes(from, to);

  return result;
}
