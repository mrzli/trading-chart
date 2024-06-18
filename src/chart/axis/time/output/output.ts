import { ensureNever } from '@gmjs/assert';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
  TimeTickInterval,
} from '../types';
import {
  getTimeTickPositionFirst,
  getTimeTickPositionNext,
} from '../time-tick-position';
import {
  formatAsDay,
  formatAsHourMinute,
  formatAsMonth,
  formatAsYear,
} from '../../../helpers';
import { LIST_OF_TIME_COMPONENT_CHANGES, TimeComponentChange } from './types';
import { binarySearchIndexLte } from '@gmjs/binary-search';
import { getTimeComponentChange } from './impl';

export function getTimeAxisOutput(
  input: TimeAxisInput,
  extendedItems: readonly TimeAxisExtendedDataItem[],
  interval: TimeTickInterval,
): readonly TimeAxisOutputItem[] {
  const { minTickDistance, position, axisLength } = input;
  const { itemSpan } = position;

  const timeBreakpoints = getTimeBreakpoints(extendedItems, interval);
  const breakpointIndices = getBreakpointIndices(
    extendedItems,
    timeBreakpoints,
  );

  const timeComponentChanges = breakpointIndices.map((index) =>
    getTimeComponentChange(extendedItems[index], interval),
  );

  const minTickItemDistance = Math.ceil(
    (minTickDistance * itemSpan) / axisLength,
  );

  const remainingIndexes = filterItems(
    timeComponentChanges,
    minTickItemDistance,
  );

  const outputItems = breakpointIndices
    .map((index, i) =>
      toOutputItem(extendedItems[index], timeComponentChanges[i]),
    )
    .filter((_item, i) => remainingIndexes.has(i));

  return outputItems;
}

function getTimeBreakpoints(
  items: readonly TimeAxisExtendedDataItem[],
  interval: TimeTickInterval,
): readonly number[] {
  const firstItem = items[0];
  const timezone = firstItem.dateObject.timezone;

  const lastItem = items.at(-1)!;
  const lastTime = lastItem.value;

  const firstBreakpoint = getTimeTickPositionFirst(firstItem, interval);

  let currBreakpoint = firstBreakpoint;

  const breakpoints: number[] = [];

  while (currBreakpoint <= lastTime) {
    breakpoints.push(currBreakpoint);
    currBreakpoint = getTimeTickPositionNext(
      currBreakpoint,
      timezone,
      interval,
    );
  }

  return breakpoints;
}

function getBreakpointIndices(
  items: readonly TimeAxisExtendedDataItem[],
  breakpoints: readonly number[],
): readonly number[] {
  const indices: number[] = [];

  let i = 0;
  let j = 0;

  while (i < items.length && j < breakpoints.length) {
    const item = items[i];
    const breakpoint = breakpoints[j];

    if (item.value >= breakpoint) {
      indices.push(i);
      i++;
      j++;
    } else {
      i++;
    }
  }

  return indices;
}
function filterItems(
  timeComponentChanges: readonly TimeComponentChange[],
  minTickItemDistance: number,
): ReadonlySet<number> {
  const addedTimeIndexes: number[] = [];

  const orderedTimeIndexes =
    getIndexesOrderedForFiltering(timeComponentChanges);

  // console.log(orderedTimeIndexes);

  for (const timeIndex of orderedTimeIndexes) {
    const timeIndexBeforeIndex = binarySearchIndexLte(
      timeIndex,
      addedTimeIndexes,
    );
    const timeIndexAfterIndex =
      timeIndexBeforeIndex + 1 < addedTimeIndexes.length
        ? timeIndexBeforeIndex + 1
        : -1;

    const timeIndexBefore =
      timeIndexBeforeIndex >= 0
        ? addedTimeIndexes[timeIndexBeforeIndex]
        : undefined;
    const timeIndexAfter =
      timeIndexAfterIndex >= 0
        ? addedTimeIndexes[timeIndexAfterIndex]
        : undefined;

    const canAddDueToBefore =
      timeIndexBefore === undefined ||
      timeIndex - minTickItemDistance >= timeIndexBefore;
    const canAddDueToAfter =
      timeIndexAfter === undefined ||
      timeIndex + minTickItemDistance <= timeIndexAfter;
    const canAdd = canAddDueToBefore && canAddDueToAfter;

    if (canAdd) {
      const addPosition = timeIndexBeforeIndex + 1;
      addedTimeIndexes.splice(addPosition, 0, timeIndex);
    }
  }

  // const result = new Set<number>(orderedTimeIndexes);
  const result = new Set<number>(addedTimeIndexes);

  return result;
}

function getIndexesOrderedForFiltering(
  timeComponentChanges: readonly TimeComponentChange[],
): readonly number[] {
  const result: number[] = [];

  for (const changeUnit of LIST_OF_TIME_COMPONENT_CHANGES) {
    for (const [i, timeComponentChange] of timeComponentChanges.entries()) {
      if (timeComponentChange === changeUnit) {
        result.push(i);
      }
    }
  }

  return result;
}

function toOutputItem(
  item: TimeAxisExtendedDataItem,
  timeComponentChange: TimeComponentChange,
): TimeAxisOutputItem {
  const label = formatTime(item, timeComponentChange);

  return {
    offset: item.offset,
    value: item.value,
    dateObject: item.dateObject,
    label,
  };
}

function formatTime(
  item: TimeAxisExtendedDataItem,
  timeComponentChange: TimeComponentChange,
): string {
  switch (timeComponentChange) {
    case 'year': {
      return formatAsYear(item.dateObject);
    }
    case 'month': {
      return formatAsMonth(item.dateObject);
    }
    case 'day': {
      return formatAsDay(item.dateObject);
    }
    case 'minute': {
      return formatAsHourMinute(item.dateObject);
    }
    default: {
      return ensureNever(timeComponentChange);
    }
  }
}
