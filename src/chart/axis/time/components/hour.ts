import { SeriesPosition, DataInterval, Old, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesHour(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  dataInterval: DataInterval,
  interval: Old,
  timezone: string,
): readonly TickValue[] {
  return [];
}
