import { unixSecondsToDateObjectTz } from '@gmjs/date-util';
import { TickValue } from '../types';
import { TimeAxisExtendedDataItem, TimeAxisInput } from './types';

export function getTimeAxisExtendedDataItem(
  tickValue: TickValue,
  input: TimeAxisInput,
): TimeAxisExtendedDataItem {
  const { offset, value } = tickValue;
  const { timezone } = input;

  const dateObject = unixSecondsToDateObjectTz(value, timezone);

  return {
    offset,
    value,
    dateObject,
  };
}
