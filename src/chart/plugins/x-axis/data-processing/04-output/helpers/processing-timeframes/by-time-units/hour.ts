import { mapGetOrThrow } from '@gmjs/data-container-util';
import { TimeTickTimeframe, TimeTickTimeframeValue } from '../../../../types';
import { clampToSingleTimeframeUnit } from '../shared';

export function getTimeAxisProcessingTimeframesHour(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframe[] {
  const [fromValue, toValue] = clampToSingleTimeframeUnit(from, to, 'h');

  const initialValues = mapGetOrThrow(HOURS_VALUES_MAP, toValue);

  const values = initialValues.filter((v) => v <= fromValue && v >= toValue);

  const timeframes: readonly TimeTickTimeframe[] = values.map((v) => ({
    unit: 'h',
    value: v,
  }));

  return timeframes;
}

const HOURS_VALUES_MAP: ReadonlyMap<
  TimeTickTimeframeValue<'h'>,
  readonly TimeTickTimeframeValue<'h'>[]
> = new Map([
  [12, [12]],
  [6, [12, 6]],
  [3, [12, 6, 3]],
  [8, [8]],
  [4, [8, 4]],
  [2, [8, 4, 2]],
  [1, [8, 4, 2, 1]],
]);
