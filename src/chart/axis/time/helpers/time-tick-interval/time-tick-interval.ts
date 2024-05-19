import { ensureNever } from '@gmjs/assert';
import { Interval } from '../../../../types';
import { getMinValuePerTick } from './shared';
import {
  getNextHigherIntervalFromDays,
  getNextHigherIntervalFromHours,
  getNextHigherIntervalFromMinutes,
  getNextHigherIntervalFromMonths,
  getNextHigherIntervalFromSeconds,
  getNextHigherIntervalFromYears,
} from './time-components';

export function getMinTimeTickInterval(
  itemSpan: number,
  axisLength: number,
  interval: Interval,
  minTickDistance: number,
): Interval {
  const { unit, value } = interval;
  const valuePerItem = Math.max(Math.ceil(value), 1);

  const itemsPerPixel = itemSpan / axisLength;
  const valuePerPixel = itemsPerPixel * valuePerItem;
  const minValuePerTick = getMinValuePerTick(
    valuePerPixel,
    valuePerItem,
    minTickDistance,
  );

  switch (unit) {
    case 's': {
      return getNextHigherIntervalFromSeconds(minValuePerTick);
    }
    case 'm': {
      return getNextHigherIntervalFromMinutes(minValuePerTick);
    }
    case 'h': {
      return getNextHigherIntervalFromHours(minValuePerTick);
    }
    case 'D': {
      return getNextHigherIntervalFromDays(minValuePerTick);
    }
    case 'W': {
      return getNextHigherIntervalFromDays(minValuePerTick * 7);
    }
    case 'M': {
      return getNextHigherIntervalFromMonths(minValuePerTick);
    }
    case 'Y': {
      return getNextHigherIntervalFromYears(minValuePerTick);
    }
    default: {
      return ensureNever(unit);
    }
  }
}
