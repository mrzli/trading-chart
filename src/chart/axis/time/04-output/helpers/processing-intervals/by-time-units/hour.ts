import { mapGetOrThrow } from '@gmjs/data-container-util';
import { TimeTickInterval, TimeTickIntervalValue } from '../../../../types';
import { clampToSingleTimeUnit } from '../shared';

export function getTimeAxisProcessingIntervalsHour(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickInterval[] {
  const [fromValue, toValue] = clampToSingleTimeUnit(from, to, 'h');

  const initialValues = mapGetOrThrow(HOURS_VALUES_MAP, toValue);

  const values = initialValues.filter((v) => v <= fromValue && v >= toValue);

  const intervals: readonly TimeTickInterval[] = values.map((v) => ({
    unit: 'h',
    value: v,
  }));

  return intervals;
}

const HOURS_VALUES_MAP: ReadonlyMap<
  TimeTickIntervalValue<'h'>,
  readonly TimeTickIntervalValue<'h'>[]
> = new Map([
  [12, [12]],
  [6, [12, 6]],
  [3, [12, 6, 3]],
  [8, [8]],
  [4, [8, 4]],
  [2, [8, 4, 2]],
  [1, [8, 4, 2, 1]],
]);
