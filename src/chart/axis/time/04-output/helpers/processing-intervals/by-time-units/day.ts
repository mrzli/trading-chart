import { TimeTickInterval, TimeTickIntervalValue } from '../../../../types';
import { clampToSingleTimeUnit } from '../shared';

export function getTimeAxisProcessingIntervalsDay(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickInterval[] {
  const [fromValue, toValue] = clampToSingleTimeUnit(from, to, 'D');

  const values = DAY_VALUES.filter((v) => v <= fromValue && v >= toValue);

  const intervals: readonly TimeTickInterval[] = values.map((v) => ({
    unit: 'D',
    value: v,
  }));

  return intervals;
}

const DAY_VALUES: readonly TimeTickIntervalValue<'D'>[] = [14, 7, 1];
