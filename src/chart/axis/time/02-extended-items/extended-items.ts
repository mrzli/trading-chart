import { unixSecondsToDateObjectTz } from '@gmjs/date-util';
import { TickValue } from '../../types';
import { TimeAxisExtendedDataItem } from '../types';

export function getTimeAxisExtendedItems(
  tickValues: readonly TickValue[],
  timezone: string,
): readonly TimeAxisExtendedDataItem[] {
  const dateObjects = tickValues.map((v) =>
    unixSecondsToDateObjectTz(v.value, timezone),
  );

  const extendedData: TimeAxisExtendedDataItem[] = [];

  for (const [i, tickValue] of tickValues.entries()) {
    const previousDateObject = i > 0 ? dateObjects[i - 1] : undefined;

    const item: TimeAxisExtendedDataItem = {
      offset: tickValue.offset,
      value: tickValue.value,
      dateObject: dateObjects[i],
      previousDateObject,
    };

    extendedData.push(item);
  }

  return extendedData;
}
