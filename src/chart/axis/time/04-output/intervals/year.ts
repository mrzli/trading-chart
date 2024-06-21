import { getMultipleGte } from '../../../../helpers';
import {
  TimeAxisExtendedDataItem,
  TimeAxisProcessInput,
  TimeTickIntervalYear,
} from '../../types';
import { TimeDisplayType } from '../types';
import { getTakenTicks, canAddTick, addTakenTick } from './shared';

export function processTimeTickOutputYear(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickIntervalYear,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickInterval;

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const firstYear = getFirstVisibleYearStart(extendedItems);
  const fistTickYear = getMultipleGte(firstYear, tickIntervalValue);

  let nextTickYear = fistTickYear;

  const numItems = extendedItems.length;

  let i = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugData: any = {
    minTickItemDistance,
    iterations: [],
  };

  while (i < numItems) {
    const item = extendedItems[i];
    const currentItemYear = item.dateObject.year;

    let increment = 1;

    const isTickYearItem =
      currentItemYear === nextTickYear && isYearChange(item);

    if (isTickYearItem && canAddTick(takenTicks, i, minTickItemDistance)) {
      updatedTicks[i] = 'year';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
      nextTickYear += tickIntervalValue;
    }

    if (currentItemYear >= nextTickYear) {
      nextTickYear = getMultipleGte(currentItemYear, tickIntervalValue);
    }

    debugData.iterations.push({
      i,
      takenTicks: [...takenTicks],
      currentItemYear,
      nextYear: nextTickYear,
    });

    i += increment;
  }

  // console.log(debugData);

  return updatedTicks;
}

function getFirstVisibleYearStart(
  extendedItems: readonly TimeAxisExtendedDataItem[],
): number {
  const firstItem = extendedItems[0];
  const beforeFirstItemYear = firstItem.previousDateObject?.year;
  const firstItemYear = firstItem.dateObject.year;
  const firstYear = beforeFirstItemYear
    ? beforeFirstItemYear + 1
    : firstItemYear;

  return firstYear;
}

function isYearChange(extendedItem: TimeAxisExtendedDataItem): boolean {
  const { previousDateObject, dateObject } = extendedItem;
  if (previousDateObject === undefined) {
    return true;
  }

  return dateObject.year !== previousDateObject.year;
}
