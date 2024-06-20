import {
  LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS,
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
