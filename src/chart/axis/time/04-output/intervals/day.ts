import { mapGetOrThrow } from '@gmjs/data-container-util';
import {
  TimeAxisExtendedDataItem,
  TimeAxisProcessInput,
  TimeTickIntervalDay,
  TimeTickIntervalValue,
} from '../../types';
import { TimeDisplayType } from '../types';
import { getTakenTicks, canAddTick, addTakenTick } from './shared';
import { range } from '@gmjs/array-create';

export function processTimeTickOutputDay(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickIntervalDay,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickInterval;

  const transitionDay = mapGetOrThrow(TRANSITION_DAY_MAP, tickIntervalValue);
  const transitionDaysSet: ReadonlySet<number> = new Set(transitionDay);

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const numItems = extendedItems.length;

  let i = 0;

  while (i < numItems) {
    const item = extendedItems[i];

    const isTransitionDay =
      isDayChange(item) && transitionDaysSet.has(item.dateObject.month);

    let increment = 1;

    if (isTransitionDay && canAddTick(takenTicks, i, minTickItemDistance)) {
      updatedTicks[i] = 'day';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
    }

    i += increment;
  }

  return updatedTicks;
}

const TRANSITION_DAY_MAP: ReadonlyMap<
  TimeTickIntervalValue<'D'>,
  readonly number[]
> = new Map([
  [14, [15]],
  [7, [1, 8, 15, 22]],
  [1, range(1, 32)],
]);

function isDayChange(extendedItem: TimeAxisExtendedDataItem): boolean {
  const { previousDateObject, dateObject } = extendedItem;
  if (previousDateObject === undefined) {
    return true;
  }

  return (
    dateObject.year !== previousDateObject.year ||
    dateObject.month !== previousDateObject.month ||
    dateObject.day !== previousDateObject.day
  );
}
