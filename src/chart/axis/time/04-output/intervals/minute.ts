import { mapGetOrThrow } from '@gmjs/data-container-util';
import {
  TimeAxisExtendedDataItem,
  TimeAxisProcessInput,
  TimeTickIntervalMinute,
  TimeTickIntervalValue,
} from '../../types';
import { TimeDisplayType } from '../types';
import { getTakenTicks, canAddTick, addTakenTick } from './shared';
import { range } from '@gmjs/array-create';

export function processTimeTickOutputMinute(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickIntervalMinute,
): readonly TimeDisplayType[] {
  const { extendedItems, minTickItemDistance } = input;

  const { value: tickIntervalValue } = currentTimeTickInterval;

  const transitionMinutes = mapGetOrThrow(
    TRANSITION_MINUTE_MAP,
    tickIntervalValue,
  );
  const transitionMinuteSet: ReadonlySet<number> = new Set(transitionMinutes);

  const updatedTicks: TimeDisplayType[] = [...existingTicks];

  const takenTicks = getTakenTicks(updatedTicks);

  const numItems = extendedItems.length;

  let i = 0;

  while (i < numItems) {
    const item = extendedItems[i];

    const isTransitionMinute =
      isMinuteChange(item) && transitionMinuteSet.has(item.dateObject.minute);

    let increment = 1;

    if (isTransitionMinute && canAddTick(takenTicks, i, minTickItemDistance)) {
      updatedTicks[i] = 'minute';
      addTakenTick(takenTicks, i);
      increment = minTickItemDistance;
    }

    i += increment;
  }

  return updatedTicks;
}

const TRANSITION_MINUTE_MAP: ReadonlyMap<
  TimeTickIntervalValue<'m'>,
  readonly number[]
> = new Map([
  [30, [30]],
  [15, [15, 30, 45]],
  [10, range(10, 60, 10)],
  [5, range(5, 60, 5)],
  [3, range(3, 60, 3)],
  [2, range(2, 60, 2)],
  [1, range(1, 60, 1)],
]);

function isMinuteChange(_extendedItem: TimeAxisExtendedDataItem): boolean {
  return true;
}
