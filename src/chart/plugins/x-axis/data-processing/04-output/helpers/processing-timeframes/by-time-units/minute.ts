import { mapGetOrThrow } from '@gmjs/data-container-util';
import { TimeTickTimeframe, TimeTickTimeframeValue } from '../../../../types';
import { clampToSingleTimeframeUnit } from '../shared';

export function getTimeAxisProcessingTimeframesMinute(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframe[] {
  const [fromValue, toValue] = clampToSingleTimeframeUnit(from, to, 'm');

  const initialValues = mapGetOrThrow(MINUTE_VALUES_MAP, toValue);

  const values = initialValues.filter((v) => v <= fromValue && v >= toValue);

  const timeframes: readonly TimeTickTimeframe[] = values.map((v) => ({
    unit: 'm',
    value: v,
  }));

  return timeframes;
}

const MINUTE_VALUES_MAP: ReadonlyMap<
  TimeTickTimeframeValue<'m'>,
  readonly TimeTickTimeframeValue<'m'>[]
> = new Map([
  [30, [30]],
  [15, [30, 15]],
  [5, [30, 15, 5]],
  [3, [30, 15, 3]],
  [1, [30, 15, 5, 1]],
  [10, [30, 10]],
  [2, [30, 10, 2]],
]);
