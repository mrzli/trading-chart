import { TickValue } from '../../types';
import { TimeAxisInput, TimeAxisTickValueData } from '../types';

export function getTimeAxisTickValueData(
  input: TimeAxisInput,
): TimeAxisTickValueData {
  const { position, axisLength, data } = input;

  const { rightItemOffset, itemSpan } = position;

  if (data.length === 0) {
    return {
      beforeFirstTime: undefined,
      tickValues: [],
    };
  }

  const leftItemOffset = rightItemOffset - itemSpan;

  const rawFirstItemIndex = Math.floor(leftItemOffset + ITEM_TICK_OFFSET);
  const rawLastItemIndex = Math.floor(rightItemOffset - ITEM_TICK_OFFSET);

  const firstItemIndex = Math.max(0, rawFirstItemIndex);
  const lastItemIndex = Math.min(rawLastItemIndex, data.length - 1);

  const beforeFirstTime =
    firstItemIndex > 0 ? data[firstItemIndex - 1].time : undefined;

  const ticks: TickValue[] = [];

  for (let i = firstItemIndex; i <= lastItemIndex; i++) {
    const { time } = data[i];
    const offset = indexToTickOffset(i, leftItemOffset, axisLength, itemSpan);
    const item: TickValue = { value: time, offset };
    ticks.push(item);
  }

  return {
    beforeFirstTime,
    tickValues: ticks,
  };
}

function indexToTickOffset(
  i: number,
  leftItemOffset: number,
  axisLength: number,
  itemSpan: number,
): number {
  return Math.round(
    (i - leftItemOffset + ITEM_TICK_OFFSET) * (axisLength / itemSpan),
  );
}

const ITEM_TICK_OFFSET = 0.5;
