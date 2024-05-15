import { SeriesPosition, DataInterval, Interval, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesMonth(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  dataInterval: DataInterval,
  interval: Interval,
): readonly TickValue[] {
  return [];
}
