import { TimeTickTimeframe, TimeTickTimeframeValue } from '../../../../types';
import { clampToSingleTimeframeUnit } from '../shared';

export function getTimeAxisProcessingTimeframesMonth(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframe[] {
  const [fromValue, toValue] = clampToSingleTimeframeUnit(from, to, 'M');

  const values = MONTH_VALUES.filter((v) => v <= fromValue && v >= toValue);

  const timeframes: readonly TimeTickTimeframe[] = values.map((v) => ({
    unit: 'M',
    value: v,
  }));

  return timeframes;
}

const MONTH_VALUES: readonly TimeTickTimeframeValue<'M'>[] = [6, 3, 1];
