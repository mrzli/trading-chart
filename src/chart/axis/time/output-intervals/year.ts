import { MIN_X_AXIS_TICK_DISTANCE, formatAsYear } from '../../../helpers';
import { getNextHigherIntervalFromYears } from '../time-tick-interval/time-components';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from '../types';

export function getTimeAxisOutputYear(
  input: TimeAxisInput,
  items: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  if (items.length === 0) {
    return [];
  }

  const { position, axisLength, interval } = input;

  const { itemSpan } = position;

  const yearsPerItem = Math.ceil(interval.value);

  const itemsPerPixel = itemSpan / axisLength;
  const yearsPerPixel = itemsPerPixel * yearsPerItem;
  const minYearsPerTick = yearsPerPixel * MIN_X_AXIS_TICK_DISTANCE;
  const referentMinYearsPerTick = Math.max(
    Math.ceil(minYearsPerTick),
    yearsPerItem,
    1,
  );

  const finalYearsPerTick = getNextHigherIntervalFromYears(
    referentMinYearsPerTick,
  ).value;
  const firstItemYear = items[0].dateObject.year;
  const firstTickYear =
    Math.ceil(firstItemYear / finalYearsPerTick) * finalYearsPerTick;

  const result: TimeAxisOutputItem[] = [];

  let nextTickYear = firstTickYear;
  let lastTickOffset = Number.MIN_SAFE_INTEGER;

  for (const item of items) {
    const itemYear = item.dateObject.year;
    if (itemYear < nextTickYear) {
      continue;
    }

    if (item.offset - lastTickOffset >= MIN_X_AXIS_TICK_DISTANCE) {
      const outputItem: TimeAxisOutputItem = {
        offset: item.offset,
        value: item.value,
        dateObject: item.dateObject,
        label: formatAsYear(item.dateObject),
      };

      result.push(outputItem);

      lastTickOffset = item.offset;
    }

    nextTickYear += finalYearsPerTick;
  }

  return result;
}
