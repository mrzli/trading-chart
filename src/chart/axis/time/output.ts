import { invariant } from '@gmjs/assert';
import {
  getTimeAxisOutputDay,
  getTimeAxisOutputHour,
  getTimeAxisOutputMinute,
  getTimeAxisOutputMonth,
  getTimeAxisOutputSecond,
  getTimeAxisOutputWeek,
  getTimeAxisOutputYear,
} from './output-intervals';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from './types';

export function getTimeAxisOutput(
  input: TimeAxisInput,
  extendedItems: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  const { interval } = input;

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
