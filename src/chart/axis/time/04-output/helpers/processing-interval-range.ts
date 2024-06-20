import { DateObjectTz } from '@gmjs/date-util';
import { Interval } from '../../../../types';
import { TimeTickInterval } from '../../types';
import { getTimeAxisProcessingIntervals } from './processing-intervals';
import { getTimeAxisProcessingIntervalRangeInternal } from './processing-intervals/interval-range-helpers';

export function getTimeAxisProcessingIntervalRange(
  timeTickInterval: TimeTickInterval,
  dataInterval: Interval,
  dateBeforeFirst: DateObjectTz | undefined,
  dateLast: DateObjectTz,
): readonly TimeTickInterval[] {
  const [from, to] = getTimeAxisProcessingIntervalRangeInternal(
    timeTickInterval,
    dataInterval,
    dateBeforeFirst,
    dateLast,
  );

  const result = getTimeAxisProcessingIntervals(from, to);

  return result;
}
