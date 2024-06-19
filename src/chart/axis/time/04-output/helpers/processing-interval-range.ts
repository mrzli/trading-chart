import { DateObjectTz } from '@gmjs/date-util';
import { Interval } from '../../../../types';
import { TimeTickInterval } from '../../types';

export function getTimeAxisProcessingIntervalRange(
  timeTickInterval: TimeTickInterval,
  dataInterval: Interval,
  dateBeforeFirst: DateObjectTz | undefined,
  dateLast: DateObjectTz,
): readonly TimeTickInterval[] {
  return [];
}
