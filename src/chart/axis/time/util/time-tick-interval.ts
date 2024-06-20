import {
  LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS,
  TimeTickInterval,
  TimeTickIntervalTimeUnit,
} from '../types';

export function compareTimeTickIntervalTimeUnit(
  tu1: TimeTickIntervalTimeUnit,
  tu2: TimeTickIntervalTimeUnit,
): number {
  return Math.sign(TIME_UNIT_ORDER.get(tu1)! - TIME_UNIT_ORDER.get(tu2)!);
}

const TIME_UNIT_ORDER: ReadonlyMap<TimeTickIntervalTimeUnit, number> = new Map(
  LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS.map((unit, index) => [unit, index]),
);

export function compareTimeTickInterval(
  t1: TimeTickInterval,
  t2: TimeTickInterval,
): number {
  const compareUnit = compareTimeTickIntervalTimeUnit(t1.unit, t2.unit);
  if (compareUnit !== 0) {
    return compareUnit;
  }

  return Math.sign(t1.value - t2.value);
}

export function maxTimeTickInterval(
  t1: TimeTickInterval,
  t2: TimeTickInterval,
): TimeTickInterval {
  return compareTimeTickInterval(t1, t2) >= 0 ? t1 : t2;
}
