import { invariant } from '@gmjs/assert';
import { Interval, Ohlc, SeriesPosition } from '../../types';
import {
  getTimeAxisTickValuesYear,
  getTimeAxisTickValuesMonth,
  getTimeAxisTickValuesWeek,
  getTimeAxisTickValuesDay,
  getTimeAxisTickValuesHour,
  getTimeAxisTickValuesMinute,
  getTimeAxisTickValuesSecond,
} from './components';
import { TickValue } from '../types';

export function getTimeAxisTickValues(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  interval: Interval,
  timezone: string,
): readonly TickValue[] {
  const { unit } = interval;

  switch (unit) {
    case 'Y': {
      return getTimeAxisTickValuesYear(position, axisLength, data, interval);
    }
    case 'M': {
      return getTimeAxisTickValuesMonth(position, axisLength, data, interval);
    }
    case 'W': {
      return getTimeAxisTickValuesWeek(position, axisLength, data, interval);
    }
    case 'D': {
      return getTimeAxisTickValuesDay(position, axisLength, data, interval);
    }
    case 'h': {
      return getTimeAxisTickValuesHour(
        position,
        axisLength,
        data,
        interval,
        timezone,
      );
    }
    case 'm': {
      return getTimeAxisTickValuesMinute(
        position,
        axisLength,
        data,
        interval,
        timezone,
      );
    }
    case 's': {
      return getTimeAxisTickValuesSecond(
        position,
        axisLength,
        data,
        interval,
        timezone,
      );
    }
    default: {
      invariant(false, `Invalid interval unit: ${unit}`);
    }
  }
}
