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
import { getMinTimeTickInterval } from '../time-tick-interval';
import {
  formatAsDay,
  formatAsHourMinute,
  formatAsMonth,
  formatAsYear,
} from '../../../helpers';
import { LIST_OF_TIME_COMPONENT_CHANGES, TimeComponentChange } from './types';

export function getTimeAxisOutput(
  input: TimeAxisInput,
  extendedItems: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  if (extendedItems.length === 0) {
    return [];
  }

  const {
    minTickDistance,
    position,
    axisLength,
    interval: inputInterval,
  } = input;
  const { itemSpan } = position;

  const interval = getMinTimeTickInterval(
    itemSpan,
    axisLength,
    inputInterval,
    minTickDistance,
  );

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

function getTimeComponentChange(
  item: TimeAxisExtendedDataItem,
  interval: TimeTickInterval,
): TimeComponentChange {
  const { dateObject, previousDateObject } = item;

  if (previousDateObject === undefined) {
    const { unit } = interval;

    switch (unit) {
      case 'm':
      case 'h': {
        return 'minute';
      }
      case 'D': {
        return 'day';
      }
      case 'M': {
        return 'month';
      }
      case 'Y': {
        return 'year';
      }
      default: {
        return ensureNever(unit);
      }
    }
  }

  if (dateObject.year !== previousDateObject.year) {
    return 'year';
  } else if (dateObject.month !== previousDateObject.month) {
    return 'month';
  }
  // eslint-disable-next-line unicorn/no-negated-condition
  else if (dateObject.day !== previousDateObject.day) {
    return 'day';
  } else {
    return 'minute';
  }
}

function filterItems(
  timeComponentChanges: readonly TimeComponentChange[],
  minTickItemDistance: number,
): ReadonlySet<number> {
  const result = new Set<number>();

  const orderedIndexes = getIndexesOrderedForFiltering(timeComponentChanges);

  for (const index of orderedIndexes) {
    // get first smaller and first larger index already added
    // - do a binary search on an ordered array
    // if the difference is gte minTickItemDistance
    // - add the current index to result
    // - also add the current index to ordered array
  }

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
