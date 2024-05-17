import { TickValue } from '../types';
import { getTimeAxisOutput } from './output';
import { getTimeAxisTickValues } from './tick-values';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from './types';
import { unixSecondsToDateObjectTz } from '@gmjs/date-util';

export function processTimeAxisData(
  input: TimeAxisInput,
): readonly TimeAxisOutputItem[] {
  const { timezone } = input;

  const tickValues = getTimeAxisTickValues(input);
  const extendedItems = getExtendedItems(tickValues, timezone);

  const result = getTimeAxisOutput(input, extendedItems);

  return result;
}

function getExtendedItems(
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
