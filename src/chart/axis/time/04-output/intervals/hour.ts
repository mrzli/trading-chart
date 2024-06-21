import { mapGetOrThrow } from '@gmjs/data-container-util';
import {
  TimeAxisExtendedDataItem,
  TimeAxisProcessInput,
  TimeTickIntervalHour,
  TimeTickIntervalValue,
} from '../../types';
import { TimeDisplayType } from '../types';
import { getTakenTicks, canAddTick, addTakenTick } from './shared';
import { range } from '@gmjs/array-create';

export function processTimeTickOutputHour(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickIntervalHour,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickInterval;

  const transitionHours = mapGetOrThrow(TRANSITION_HOUR_MAP, tickIntervalValue);
  const transitionHourSet: ReadonlySet<number> = new Set(transitionHours);

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const numItems = extendedItems.length;

  let i = 0;

  while (i < numItems) {
    const item = extendedItems[i];

    const isTransitionHour =
      isHourChange(item) && transitionHourSet.has(item.dateObject.hour);

    let increment = 1;

    if (isTransitionHour && canAddTick(takenTicks, i, minTickItemDistance)) {
      updatedTicks[i] = 'minute';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
    }

    i += increment;
  }

  return updatedTicks;
}

const TRANSITION_HOUR_MAP: ReadonlyMap<
  TimeTickIntervalValue<'h'>,
  readonly number[]
> = new Map([
  [12, [12]],
  [8, [8, 16]],
  [6, [6, 12, 18]],
  [4, range(4, 24, 4)],
  [3, range(3, 24, 3)],
  [2, range(2, 24, 2)],
  [1, range(1, 24, 1)],
]);

function isHourChange(extendedItem: TimeAxisExtendedDataItem): boolean {
  const { previousDateObject, dateObject } = extendedItem;
  if (previousDateObject === undefined) {
    return true;
  }

  return (
    dateObject.year !== previousDateObject.year ||
    dateObject.month !== previousDateObject.month ||
    dateObject.day !== previousDateObject.day ||
    dateObject.hour !== previousDateObject.hour
  );
}
