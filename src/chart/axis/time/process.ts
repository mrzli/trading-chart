import { applyFn } from '@gmjs/apply-function';
import { map, toArray } from '@gmjs/value-transformers';
import { TickValue } from '../types';
import { getTimeAxisExtendedDataItem } from './extended-data';
import { getTimeAxisTickValues } from './tick-values';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from './types';

export function processTimeAxisData(
  input: TimeAxisInput,
): readonly TimeAxisOutputItem[] {
  const result = applyFn(
    input,
    (v) => getTimeAxisTickValues(v),
    map<TickValue, TimeAxisExtendedDataItem>((v) =>
      getTimeAxisExtendedDataItem(v, input),
    ),
    // calculate change type
    // - did just seconds change
    // - did a minute change
    // - did 2 minutes change
    // - did 5 minutes change
    // - did 10 minutes change
    // - did 15 minutes change
    // - did 30 minutes change
    // - did an hour change
    // - did 2 hours change
    // - did 3 hours change
    // - did 4 hours change
    // - did 6 hours change
    // - did 8 hours change
    // - did 12 hours change
    // - did a day change
    // - did a week change
    // - did a month change
    map<TimeAxisExtendedDataItem, TimeAxisOutputItem>((v, i) => ({
      offset: v.offset,
      value: v.value,
      dateObject: v.dateObject,
      label: (i % 10).toString(),
    })),
    toArray(),
  );

  return result;
}
