import { getTimeAxisExtendedItems } from './extended';
import { getTimeAxisOutput } from './output';
import { getTimeAxisTickValues } from './tick-values/tick-values';
import { TimeAxisInput, TimeAxisOutputItem } from './types';

export function processTimeAxisData(
  input: TimeAxisInput,
): readonly TimeAxisOutputItem[] {
  const { timezone } = input;

  const tickValues = getTimeAxisTickValues(input);
  const extendedItems = getTimeAxisExtendedItems(tickValues, timezone);
  const result = getTimeAxisOutput(input, extendedItems);

  return result;
}
