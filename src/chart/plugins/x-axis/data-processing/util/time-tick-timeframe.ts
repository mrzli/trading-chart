import {
  LIST_OF_TIME_TICK_TIMEFRAME_UNITS,
  TimeTickTimeframe,
  TimeTickTimeframeUnit,
} from '../types';

export function compareTimeTickTimeframeUnit(
  tu1: TimeTickTimeframeUnit,
  tu2: TimeTickTimeframeUnit,
): number {
  return Math.sign(TIME_UNIT_ORDER.get(tu1)! - TIME_UNIT_ORDER.get(tu2)!);
}

const TIME_UNIT_ORDER: ReadonlyMap<TimeTickTimeframeUnit, number> = new Map(
  LIST_OF_TIME_TICK_TIMEFRAME_UNITS.map((unit, index) => [unit, index]),
);

export function compareTimeTickTimeframe(
  t1: TimeTickTimeframe,
  t2: TimeTickTimeframe,
): number {
  const compareUnit = compareTimeTickTimeframeUnit(t1.unit, t2.unit);
  if (compareUnit !== 0) {
    return compareUnit;
  }

  return Math.sign(t1.value - t2.value);
}

export function maxTimeTickTimeframe(
  t1: TimeTickTimeframe,
  t2: TimeTickTimeframe,
): TimeTickTimeframe {
  return compareTimeTickTimeframe(t1, t2) >= 0 ? t1 : t2;
}
