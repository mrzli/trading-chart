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
  MIN_X_AXIS_TICK_DISTANCE,
  formatAsDay,
  formatAsHourMinute,
  formatAsMonth,
  formatAsYear,
} from '../../../helpers';
import { TimeComponentChange } from './types';

export function getTimeAxisOutput(
  input: TimeAxisInput,
  extendedItems: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  if (extendedItems.length === 0) {
    return [];
  }

  const { position, axisLength, interval: inputInterval } = input;
  const { itemSpan } = position;

  const interval = getMinTimeTickInterval(
    itemSpan,
    axisLength,
    inputInterval,
    MIN_X_AXIS_TICK_DISTANCE,
  );

  const timeBreakpoints = getTimeBreakpoints(extendedItems, interval);
  const breakpointIndices = getBreakpointIndices(
    extendedItems,
    timeBreakpoints,
  );

  const timeComponentChanges = breakpointIndices.map((index) =>
    getTimeComponentChange(extendedItems[index], interval),
  );

  const outputItems = breakpointIndices.map((index, i) =>
    toOutputItem(extendedItems[index], timeComponentChanges[i]),
  );

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
