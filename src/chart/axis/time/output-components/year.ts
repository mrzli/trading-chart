import { MIN_X_AXIS_TICK_DISTANCE } from '../../../helpers';
import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from '../types';

export function getTimeAxisOutputYear(
  input: TimeAxisInput,
  items: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  const { position, axisLength } = input;

  const { itemSpan } = position;

  const itemsPerPixel = itemSpan / axisLength;
  const minItemsPerTick = itemsPerPixel * MIN_X_AXIS_TICK_DISTANCE;
  const finalMinItemsPerTick = Math.max(Math.ceil(minItemsPerTick), 1);

  const result = items.map((v, i) => ({
    offset: v.offset,
    value: v.value,
    dateObject: v.dateObject,
    label: (i % 10).toString(),
  }));

  return result;
}
