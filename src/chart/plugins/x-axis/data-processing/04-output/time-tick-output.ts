import { arrayOfConstant } from '@gmjs/array-create';
import { ensureNever } from '@gmjs/assert';
import {
  TimeAxisOutputItem,
  TimeAxisProcessInput,
  TimeTickTimeframe,
} from '../types';
import {
  getTimeAxisProcessingTimeframeRange,
  toTimeAxisOutputItem,
} from './helpers';
import {
  processTimeTickOutputDay,
  processTimeTickOutputHour,
  processTimeTickOutputMinute,
  processTimeTickOutputMonth,
  processTimeTickOutputYear,
} from './timeframes';
import { TimeDisplayType } from './types';

export function getTimeTickOutputItems(
  input: TimeAxisProcessInput,
): readonly TimeAxisOutputItem[] {
  const { timeAxisInput, extendedItems, timeTickTimeframe } = input;

  const initialTicks: readonly TimeDisplayType[] = arrayOfConstant(
    extendedItems.length,
    'none',
  );

  let ticks = initialTicks;

  const processingTickTimeframes = getTimeAxisProcessingTimeframeRange(
    timeTickTimeframe,
    timeAxisInput.timeframe,
    extendedItems[0].previousDateObject,
    extendedItems.at(-1)!.dateObject,
  );

  for (const currentTimeTickTimeframe of processingTickTimeframes) {
    ticks = processTimeTickOutput(input, ticks, currentTimeTickTimeframe);
  }

  const outputItems = extendedItems
    .map((item, i) => toTimeAxisOutputItem(item, ticks[i]))
    .filter((_item, i) => ticks[i] !== 'none');

  return outputItems;
}

function processTimeTickOutput(
  input: TimeAxisProcessInput,
  existingTicks: readonly TimeDisplayType[],
  currentTimeTickTimeframe: TimeTickTimeframe,
): readonly TimeDisplayType[] {
  const { unit } = currentTimeTickTimeframe;

  switch (unit) {
    case 'm': {
      return processTimeTickOutputMinute(
        input,
        existingTicks,
        currentTimeTickTimeframe,
      );
    }
    case 'h': {
      return processTimeTickOutputHour(
        input,
        existingTicks,
        currentTimeTickTimeframe,
      );
    }
    case 'D': {
      return processTimeTickOutputDay(
        input,
        existingTicks,
        currentTimeTickTimeframe,
      );
    }
    case 'M': {
      return processTimeTickOutputMonth(
        input,
        existingTicks,
        currentTimeTickTimeframe,
      );
    }
    case 'Y': {
      return processTimeTickOutputYear(
        input,
        existingTicks,
        currentTimeTickTimeframe,
      );
    }
    default: {
      return ensureNever(unit);
    }
  }
}
