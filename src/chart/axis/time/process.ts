import {
  TimeAxisInput,
  TimeAxisOutputItem,
  TimeAxisProcessInput,
} from './types';
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

  // get minimum distance between ticks, in terms of time
  const timeTickInterval = getMinTimeTickInterval(input);

  // get minimum distance between ticks, in terms of items
  const minTickItemDistance = getMinTickDistance(input);

  const processInput: TimeAxisProcessInput = {
    timeAxisInput: input,
    extendedItems,
    timeTickInterval,
    minTickItemDistance,
  };

  const output = getTimeTickOutputItems(processInput);

  return output;
}

function getMinTickDistance(input: TimeAxisInput): number {
  const { position, axisLength, minTickDistance } = input;
  const { itemSpan } = position;

  const minTickItemDistance = Math.ceil(
    (minTickDistance * itemSpan) / axisLength,
  );

  return minTickItemDistance;
}
