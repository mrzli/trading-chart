import { mapGetOrThrow } from '@gmjs/data-container-util';
import { TimeTickInterval, TimeTickIntervalValue } from '../../../../types';
import { clampToSingleTimeUnit } from '../shared';

export function getTimeAxisProcessingIntervalsMinute(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickInterval[] {
  const [fromValue, toValue] = clampToSingleTimeUnit(from, to, 'm');

  const initialValues = mapGetOrThrow(MINUTE_VALUES_MAP, toValue);

  const values = initialValues.filter((v) => v <= fromValue && v >= toValue);

  const intervals: readonly TimeTickInterval[] = values.map((v) => ({
    unit: 'm',
    value: v,
  }));

  return intervals;
}

const MINUTE_VALUES_MAP: ReadonlyMap<
  TimeTickIntervalValue<'m'>,
  readonly TimeTickIntervalValue<'m'>[]
> = new Map([
  [30, [30]],
  [15, [30, 15]],
  [5, [30, 15, 5]],
  [3, [30, 15, 3]],
  [1, [30, 15, 5, 1]],
  [10, [30, 10]],
  [2, [30, 10, 2]],
]);
