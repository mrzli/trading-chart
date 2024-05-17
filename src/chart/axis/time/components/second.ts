import { SeriesPosition, Interval, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesSecond(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  interval: Interval,
  timezone: string,
): readonly TickValue[] {
  return [];
}
