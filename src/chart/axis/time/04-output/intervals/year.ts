import { applyFn } from '@gmjs/apply-function';
import { getMultipleGte } from '../../../../helpers';
import { TimeAxisProcessInput, TimeTickIntervalYear } from '../../types';
import { TimeDisplayType } from '../types';
import { filterOutNullish, map } from '@gmjs/value-transformers';
import { binarySearchIndexLte } from '@gmjs/binary-search';

export function processTimeTickOutputYear(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickIntervalYear,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickInterval;

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const firstItem = extendedItems[0];
  const beforeFirstItemYear = firstItem.previousDateObject?.year;
  const firstItemYear = firstItem.dateObject.year;
  const firstYear = beforeFirstItemYear
    ? beforeFirstItemYear + 1
    : firstItemYear;

  const firstDivisibleYear = getMultipleGte(firstYear, tickIntervalValue);

  let nextYear = firstDivisibleYear;

  const numItems = extendedItems.length;

  let i = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debugData: any = {
    minTickItemDistance,
    iterations: [],
  };

  while (i < numItems) {
    const item = extendedItems[i];
    const { dateObject } = item;
    const currentItemYear = dateObject.year;

    let increment = 1;

    if (
      currentItemYear === nextYear &&
      canAddTick(takenTicks, i, minTickItemDistance)
    ) {
      updatedTicks[i] = 'year';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
    }

    if (currentItemYear >= nextYear) {
      nextYear = getMultipleGte(currentItemYear, tickIntervalValue);
    }

    debugData.iterations.push({
      i,
      takenTicks: [...takenTicks],
      currentItemYear,
      nextYear,
    });

    i += increment;
  }

  console.log(debugData);

  return updatedTicks;
}

function getTakenTicks(existingTicks: readonly TimeDisplayType[]): number[] {
  const takenTicks = applyFn(
    existingTicks,
    map((v, i) => (v === 'none' ? undefined : i)),
    filterOutNullish(),
  );

  return [...takenTicks];
}

function addTakenTick(takenTicks: number[], tick: number): void {
  const prevIndex = binarySearchIndexLte(tick, takenTicks);
  takenTicks.splice(prevIndex + 1, 0, tick);
}

function canAddTick(
  takenTicks: number[],
  tick: number,
  minTickItemDistance: number,
): boolean {
  const prevIndex = binarySearchIndexLte(tick, takenTicks);
  const nextIndex = prevIndex + 1;
  const prevTick = prevIndex >= 0 ? takenTicks[prevIndex] : undefined;
  const nextTick =
    nextIndex < takenTicks.length ? takenTicks[nextIndex] : undefined;

  const canAddDueToPrev =
    prevTick === undefined || tick - minTickItemDistance >= prevTick;
  const canAddDueToNext =
    nextTick === undefined || tick + minTickItemDistance <= nextTick;

  return canAddDueToPrev && canAddDueToNext;
}
