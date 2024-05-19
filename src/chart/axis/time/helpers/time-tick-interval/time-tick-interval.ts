import { ensureNever } from '@gmjs/assert';
import { Interval } from '../../../../types';
import { getMinValuePerTick } from './shared';
import { getNextHigherIntervalFromMonths, getNextHigherIntervalFromYears } from './time-components';

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
      return {
        unit: 'Y',
        value: 1,
      };
    }
    case 'm': {
      return {
        unit: 'Y',
        value: 1,
      };
    }
    case 'h': {
      return {
        unit: 'Y',
        value: 1,
      };
    }
    case 'D': {
      return {
        unit: 'Y',
        value: 1,
      };
    }
    case 'W': {
      return {
        unit: 'Y',
        value: 1,
      };
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
