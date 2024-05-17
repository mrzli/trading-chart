import { SeriesPosition, Interval, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesWeek(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  interval: Interval,
): readonly TickValue[] {
  return [];
}
