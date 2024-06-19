import { TimeAxisInput, TimeAxisOutputItem } from './types';
import { getTimeAxisTickValueData } from './01-tick-values';
import { getTimeAxisExtendedItems } from './02-extended-items';
import { getMinTimeTickInterval } from './03-time-tick-interval';
import { getTimeTickOutputItems } from './04-output';

export function processTimeAxisData(
  input: TimeAxisInput,
): readonly TimeAxisOutputItem[] {
  const { timezone } = input;

  // get pixel offsets for timestamps
  const tickValueData = getTimeAxisTickValueData(input);
  if (tickValueData.tickValues.length === 0) {
    return [];
  }

  // get additional date data, for easier further processing
  const extendedItems = getTimeAxisExtendedItems(tickValueData, timezone);

  // get minimal distance between ticks, in terms of time
  const timeTickInterval = getMinTimeTickInterval(input);

  const output = getTimeTickOutputItems(input, extendedItems, timeTickInterval);

  return output;

  // const result = getTimeAxisOutput(input, extendedItems, timeTickInterval);

  // return result;
}
