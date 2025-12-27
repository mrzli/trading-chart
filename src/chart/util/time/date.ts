import { ensureNever, invariant } from '@gmjs/assert';
import { DateObjectTz, Duration } from '@gmjs/date-util';
import { DateTime } from 'luxon';
import { TradingChartTimeframe } from '../../types';

export function getDaysInMonth(dateObject: DateObjectTz): number {
  const { year, month } = dateObject;
  const daysInMonth = DateTime.local(year, month).daysInMonth;
  invariant(
    daysInMonth !== undefined,
    'Invalid date for daysInMonth calculation',
  );
  return daysInMonth;
}

export function timeframeToDuration(
  timeframe: TradingChartTimeframe,
  multiplier: number,
): Duration {
  const value = timeframe.value * multiplier;

  switch (timeframe.unit) {
    case 's': {
      return { seconds: value };
    }
    case 'm': {
      return { minutes: value };
    }
    case 'h': {
      return { hours: value };
    }
    case 'D': {
      return { days: value };
    }
    case 'W': {
      return { weeks: value };
    }
    case 'M': {
      return { months: value };
    }
    case 'Y': {
      return { years: value };
    }
    default: {
      return ensureNever(timeframe.unit);
    }
  }
}
