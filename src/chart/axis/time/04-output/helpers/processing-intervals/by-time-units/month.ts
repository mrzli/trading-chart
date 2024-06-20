import { TimeTickInterval, TimeTickIntervalValue } from '../../../../types';
import { clampToSingleTimeUnit } from '../shared';

export function getTimeAxisProcessingIntervalsMonth(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickInterval[] {
  const [fromValue, toValue] = clampToSingleTimeUnit(from, to, 'M');

  const values = MONTH_VALUES.filter((v) => v <= fromValue && v >= toValue);

  const intervals: readonly TimeTickInterval[] = values.map((v) => ({
    unit: 'M',
    value: v,
  }));

  return intervals;
}

const MONTH_VALUES: readonly TimeTickIntervalValue<'M'>[] = [6, 3, 1];
