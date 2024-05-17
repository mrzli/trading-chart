import {
  TimeAxisExtendedDataItem,
  TimeAxisInput,
  TimeAxisOutputItem,
} from '../types';

export function getTimeAxisOutputYear(
  input: TimeAxisInput,
  items: readonly TimeAxisExtendedDataItem[],
): readonly TimeAxisOutputItem[] {
  const result = items.map((v, i) => ({
    offset: v.offset,
    value: v.value,
    dateObject: v.dateObject,
    label: (i % 10).toString(),
  }));

  return result;
}
