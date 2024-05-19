import {
  MIN_X_AXIS_TICK_DISTANCE,
  formatAsYear,
  getSignificantDigitIndex,
} from '../../../helpers';
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

  const finalYearsPerTick = getNextHigherYearsPerTick(referentMinYearsPerTick);
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

function getNextHigherYearsPerTick(referentMinYearsPerTick: number): number {
  const significantDigitIndex = getSignificantDigitIndex(
    referentMinYearsPerTick,
  );

  const orderOfMagnitude = Math.pow(10, significantDigitIndex);

  const normalizedYears = referentMinYearsPerTick / orderOfMagnitude;

  const result = getFinaYearsPerTick(normalizedYears, orderOfMagnitude);

  return Math.max(result, 1);
}

function getFinaYearsPerTick(
  normalizedYears: number,
  orderOfMagnitude: number,
): number {
  if (normalizedYears > 5) {
    return 10 * orderOfMagnitude;
  } else if (normalizedYears > 4) {
    return 5 * orderOfMagnitude;
  } else if (normalizedYears > 2) {
    return 4 * orderOfMagnitude;
  } else if (normalizedYears > 1) {
    return 2 * orderOfMagnitude;
  } else {
    return orderOfMagnitude;
  }
}
