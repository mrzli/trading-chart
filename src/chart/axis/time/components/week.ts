import { SeriesPosition, DataInterval, Old, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesWeek(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  dataInterval: DataInterval,
  interval: Old,
): readonly TickValue[] {
  return [];
}
