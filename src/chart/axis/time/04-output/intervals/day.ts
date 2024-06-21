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

  const transitionDays = mapGetOrThrow(TRANSITION_DAY_MAP, tickIntervalValue);

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const numItems = extendedItems.length;

  let i = 0;
  let transitionBreakpointsTaken = 0;

  while (i < numItems) {
    const item = extendedItems[i];

    let increment = 1;

    if (isDayChange(item)) {
      if (isMonthChange(item)) {
        transitionBreakpointsTaken = 0;
      }

      const transitionBreakpointIndex = transitionDays.findIndex(
        (d, i) => item.dateObject.day >= d && i >= transitionBreakpointsTaken,
      );

      if (transitionBreakpointIndex !== -1) {
        transitionBreakpointsTaken = transitionBreakpointIndex + 1;

        if (canAddTick(takenTicks, i, minTickItemDistance)) {
          updatedTicks[i] = 'day';
          addTakenTick(takenTicks, i);
          increment = minTickItemDistance;
        }
      }
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
  [7, [8, 15, 22]],
  [1, range(1, 32)],
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
