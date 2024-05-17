import { SeriesPosition, Interval, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesDay(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  interval: Interval,
): readonly TickValue[] {
  return [];
}
