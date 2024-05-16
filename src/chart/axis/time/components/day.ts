import { SeriesPosition, DataInterval, Old, Ohlc } from '../../../types';
import { TickValue } from '../../types';

export function getTimeAxisTickValuesDay(
  position: SeriesPosition,
  axisLength: number,
  data: readonly Ohlc[],
  dataInterval: DataInterval,
  interval: Old,
): readonly TickValue[] {
  return [];
}
