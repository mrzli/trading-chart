import { TimeTickTimeframe, TimeTickTimeframeValue } from '../../../../types';
import { clampToSingleTimeframeUnit } from '../shared';

export function getTimeAxisProcessingTimeframesDay(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframe[] {
  const [fromValue, toValue] = clampToSingleTimeframeUnit(from, to, 'D');

  const values = DAY_VALUES.filter((v) => v <= fromValue && v >= toValue);

  const timeframes: readonly TimeTickTimeframe[] = values.map((v) => ({
    unit: 'D',
    value: v,
  }));

  return timeframes;
}

const DAY_VALUES: readonly TimeTickTimeframeValue<'D'>[] = [14, 7, 1];
