import { invariant } from '@gmjs/assert';
import {
  getTimeAxisOutputDay,
  getTimeAxisOutputHour,
  getTimeAxisOutputMinute,
  getTimeAxisOutputMonth,
  getTimeAxisOutputSecond,
  getTimeAxisOutputWeek,
  getTimeAxisOutputYear,
} from '../output-intervals';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from '../types';

export function getTimeAxisOutput(
  input: TimeAxisInput,
  extendedItems: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  const { interval } = input;

  // take first and last item
  // - find max time component change (year, month, day, minute, none)

  // find tick intervals

  // for tick intervals of:
  // - year
  //   - no need to find component changes
  // - month
  //   - find year component change
  // - week, day
  //   - find year, month component change
  // - hour, minute
  //   - find year, month, day component change
  // - second
  //   - find year, month, day, minute component change

  // component change searches are the intersection of the above:
  // - max time component change
  // - relevant time component change based on the input interval

  // go over each item, and mark the max time component change

  // have a set per time component
  // - starting with year, and going down, exclude items around that are too close
  //   and remove if overwriting any time component change
  // - finally do a pass for tick intervals

  const { unit } = interval;

  switch (unit) {
    case 's': {
      return getTimeAxisOutputSecond(input, extendedItems);
    }
    case 'm': {
      return getTimeAxisOutputMinute(input, extendedItems);
    }
    case 'h': {
      return getTimeAxisOutputHour(input, extendedItems);
    }
    case 'D': {
      return getTimeAxisOutputDay(input, extendedItems);
    }
    case 'W': {
      return getTimeAxisOutputWeek(input, extendedItems);
    }
    case 'M': {
      return getTimeAxisOutputMonth(input, extendedItems);
    }
    case 'Y': {
      return getTimeAxisOutputYear(input, extendedItems);
    }
    default: {
      invariant(false, `Invalid interval unit: '${unit}'.`);
    }
  }
}
