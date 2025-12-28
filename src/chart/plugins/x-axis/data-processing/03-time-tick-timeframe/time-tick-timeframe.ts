import { ensureNever } from '@gmjs/assert';
import { getMinValuePerTick } from './shared';
import {
  getNextHigherTimeframeFromDays,
  getNextHigherTimeframeFromHours,
  getNextHigherTimeframeFromMinutes,
  getNextHigherTimeframeFromMonths,
  getNextHigherTimeframeFromSeconds,
  getNextHigherTimeframeFromYears,
} from './time-components';
import { TimeAxisInput, TimeTickTimeframe } from '../types';

export function getMinTimeTickTimeframe(
  input: TimeAxisInput,
): TimeTickTimeframe {
  const { position, axisLength, timeframe, minTickDistance } = input;
  const { itemSpan } = position;

  const { unit, value } = timeframe;
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
      return getNextHigherTimeframeFromSeconds(minValuePerTick);
    }
    case 'm': {
      return getNextHigherTimeframeFromMinutes(minValuePerTick);
    }
    case 'h': {
      return getNextHigherTimeframeFromHours(minValuePerTick);
    }
    case 'D': {
      return getNextHigherTimeframeFromDays(minValuePerTick);
    }
    case 'W': {
      return getNextHigherTimeframeFromDays(minValuePerTick * 7);
    }
    case 'M': {
      return getNextHigherTimeframeFromMonths(minValuePerTick);
    }
    case 'Y': {
      return getNextHigherTimeframeFromYears(minValuePerTick);
    }
    default: {
      return ensureNever(unit);
    }
  }
}
