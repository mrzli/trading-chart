import { unixSecondsToDateObjectTz } from '@gmjs/date-util';
import { TimeAxisExtendedDataItem, TimeAxisTickValueData } from '../types';

export function getTimeAxisExtendedItems(
  tickValueData: TimeAxisTickValueData,
  timezone: string,
): readonly TimeAxisExtendedDataItem[] {
  const { beforeFirstTime, tickValues } = tickValueData;

  const beforeFirstDateObject =
    beforeFirstTime === undefined
      ? undefined
      : unixSecondsToDateObjectTz(beforeFirstTime, timezone);

  const dateObjects = tickValues.map((v) =>
    unixSecondsToDateObjectTz(v.value, timezone),
  );

  const extendedData: TimeAxisExtendedDataItem[] = [];

  for (const [i, tickValue] of tickValues.entries()) {
    const previousDateObject =
      i > 0 ? dateObjects[i - 1] : beforeFirstDateObject;

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
