import { SeriesPosition, DataInterval, Interval, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesHour(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  dataInterval: DataInterval,
  interval: Interval,
  timezone: string,
): readonly TickValue[] {
  return [];
}
