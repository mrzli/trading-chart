import { ensureNever } from '@gmjs/assert';
import {
  TimeAxisOutputItem,
  TimeAxisProcessInput,
  TimeTickInterval,
} from '../types';
import { TimeDisplayType } from './types';
import { processTimeTickOutputYear } from './intervals';
import { arrayOfConstant } from '@gmjs/array-create';
import {
  getTimeAxisProcessingIntervalRange,
  toTimeAxisOutputItem,
} from './helpers';

export function getTimeTickOutputItems(
  input: TimeAxisProcessInput,
): readonly TimeAxisOutputItem[] {
  const { timeAxisInput, extendedItems, timeTickInterval } = input;

  const initialTicks: readonly TimeDisplayType[] = arrayOfConstant(
    extendedItems.length,
    'none',
  );

  let ticks = initialTicks;

  const processingTickIntervals = getTimeAxisProcessingIntervalRange(
    timeTickInterval,
    timeAxisInput.interval,
    extendedItems[0].previousDateObject,
    extendedItems.at(-1)!.dateObject,
  );

  for (const currentTimeTickInterval of processingTickIntervals) {
    ticks = processTimeTickOutput(input, ticks, currentTimeTickInterval);
  }

  const outputItems = extendedItems
    .map((item, i) => toTimeAxisOutputItem(item, ticks[i]))
    .filter((_item, i) => ticks[i] !== 'none');

  return outputItems;
}

function processTimeTickOutput(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickInterval: TimeTickInterval,
): readonly TimeDisplayType[] {
  const { unit } = currentTimeTickInterval;

  switch (unit) {
    case 'm': {
      return [];
    }
    case 'h': {
      return [];
    }
    case 'D': {
      return [];
    }
    case 'M': {
      return [];
    }
    case 'Y': {
      return processTimeTickOutputYear(
        input,
        existingTicks,
        currentTimeTickInterval,
      );
    }
    default: {
      return ensureNever(unit);
    }
  }
}
