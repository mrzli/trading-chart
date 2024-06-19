import { getMultipleGte } from '../../../../helpers';
import { TimeAxisProcessInput } from '../../types';
import { TimeDisplayType } from '../types';

export function processTimeTickOutputYear(
  input: TimeAxisProcessInput,
): readonly TimeDisplayType[] {
  const { existingTicks, extendedItems, timeTickInterval } = input;

  const { value: tickIntervalValue } = timeTickInterval;

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  console.log(timeTickInterval);

  const firstItem = extendedItems[0];
  const beforeFirstItemYear = firstItem.previousDateObject?.year;
  const firstItemYear = firstItem.dateObject.year;
  const firstYear = beforeFirstItemYear
    ? beforeFirstItemYear + 1
    : firstItemYear;

  const firstDivisibleYear = getMultipleGte(firstYear, tickIntervalValue);

  let nextYear = firstDivisibleYear;

  for (const [i, item] of extendedItems.entries()) {
    const { dateObject } = item;
    const currentItemYear = dateObject.year;

    if (currentItemYear === nextYear) {
      updatedTicks[i] = 'year';
    }

    if (currentItemYear >= nextYear) {
      nextYear = getMultipleGte(currentItemYear, tickIntervalValue);
    }
  }

  return updatedTicks;
}

// handling time tick interval
// - Y
//   - can be 1, 2, 4, 5, 10, 20, etc
//   - just find first divisible, start with that
//     - then add the number
//     - if it matches the sum, add the item
//     - repeat till end
//   - go over items again and fill any gaps with any year encountered
