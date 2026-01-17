import { range } from '@gmjs/array-create';
import { mapGetOrThrow } from '@gmjs/data-container-util';
import {
  TimeAxisExtendedDataItem,
  TimeAxisProcessInput,
  TimeTickTimeframeMonth,
  TimeTickTimeframeValue,
} from '../../types';
import { TimeDisplayType } from '../types';
import { getTakenTicks, canAddTick, addTakenTick } from './shared';

export function processTimeTickOutputMonth(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickTimeframe: TimeTickTimeframeMonth,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickTimeframe;

  const transitionMonths = mapGetOrThrow(
    TRANSITION_MONTHS_MAP,
    tickIntervalValue,
  );
  const transitionMonthsSet: ReadonlySet<number> = new Set(transitionMonths);

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const numItems = extendedItems.length;

  let i = 0;

  while (i < numItems) {
    const item = extendedItems[i];

    const isTransitionMonth =
      isMonthChange(item) && transitionMonthsSet.has(item.dateObject.month);

    let increment = 1;

    if (isTransitionMonth && canAddTick(takenTicks, i, minTickItemDistance)) {
      updatedTicks[i] = 'month';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
    }

    i += increment;
  }

  return updatedTicks;
}

const TRANSITION_MONTHS_MAP: ReadonlyMap<
  TimeTickTimeframeValue<'M'>,
  readonly number[]
> = new Map([
  [6, [7]],
  [3, [1, 4, 7, 10]],
  [1, range(1, 13)],
]);

function isMonthChange(extendedItem: TimeAxisExtendedDataItem): boolean {
  const { previousDateObject, dateObject } = extendedItem;
  if (previousDateObject === undefined) {
    return true;
  }

  return (
    dateObject.year !== previousDateObject.year ||
    dateObject.month !== previousDateObject.month
  );
}
