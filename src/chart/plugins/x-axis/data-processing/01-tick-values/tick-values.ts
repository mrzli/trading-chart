import { TickValue } from '../../../../types';
import {
  getFirstVisibleIndex,
  getLastVisibleIndex,
  seriesIndexFractionalToPixel,
} from '../../../../util';
import { TimeAxisInput, TimeAxisTickValueData } from '../types';

export function getTimeAxisTickValueData(
  input: TimeAxisInput,
): TimeAxisTickValueData {
  const { position, axisLength, data } = input;

  if (data.length === 0) {
    return {
      beforeFirstTime: undefined,
      tickValues: [],
    };
  }

  const firstItemIndex = getFirstVisibleIndex(
    position,
    data.length,
    ITEM_TICK_OFFSET,
  );
  const lastItemIndex = getLastVisibleIndex(
    position,
    data.length,
    -ITEM_TICK_OFFSET,
  );

  const beforeFirstTime =
    firstItemIndex > 0 ? data[firstItemIndex - 1].time : undefined;

  const ticks: TickValue[] = [];

  for (let i = firstItemIndex; i <= lastItemIndex; i++) {
    const { time } = data[i];
    const offset = seriesIndexFractionalToPixel(
      i + ITEM_TICK_OFFSET,
      axisLength,
      position,
    );
    const item: TickValue = { value: time, offset };
    ticks.push(item);
  }

  return {
    beforeFirstTime,
    tickValues: ticks,
  };
}

const ITEM_TICK_OFFSET = 0.5;
