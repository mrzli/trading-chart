import { ensureNever, invariant } from '@gmjs/assert';
import {
  LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_UNITS,
  TimeTickTimeframeValue,
  TimeTickTimeframe,
  TimeTickTimeframeUnit,
} from '../../../types';
import { compareTimeTickTimeframeUnit } from '../../../util';

const LIST_OF_TIME_TICK_TIMEFRAME_UNITS_REVERSED =
  LIST_OF_TIME_TICK_TIMEFRAME_UNITS.toReversed();

export function getTimeframeUnitRange(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframeUnit[] {
  return LIST_OF_TIME_TICK_TIMEFRAME_UNITS_REVERSED.filter(
    (unit) =>
      compareTimeTickTimeframeUnit(unit, from.unit) <= 0 &&
      compareTimeTickTimeframeUnit(unit, to.unit) >= 0,
  );
}

export function clampToSingleTimeframeUnit<TUnit extends TimeTickTimeframeUnit>(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
  unit: TUnit,
): readonly [TimeTickTimeframeValue<TUnit>, TimeTickTimeframeValue<TUnit>] {
  const clampedFrom = limitTimeframeUnitFromToMaxReferent(from, unit);
  const clampedTo = limitTimeframeUnitToToMinReferent(to, unit);
  invariant(
    clampedFrom.unit === unit && clampedTo.unit === unit,
    'Invalid clamped unit result.',
  );

  // TODO: type this better
  return [clampedFrom.value, clampedTo.value] as readonly [
    TimeTickTimeframeValue<TUnit>,
    TimeTickTimeframeValue<TUnit>,
  ];
}

function limitTimeframeUnitFromToMaxReferent(
  from: TimeTickTimeframe,
  unit: TimeTickTimeframeUnit,
): TimeTickTimeframe {
  const compare = compareTimeTickTimeframeUnit(from.unit, unit);
  return compare > 0 ? maxValueOfTimeUnit(unit) : from;
}

function limitTimeframeUnitToToMinReferent(
  to: TimeTickTimeframe,
  unit: TimeTickTimeframeUnit,
): TimeTickTimeframe {
  const compare = compareTimeTickTimeframeUnit(to.unit, unit);
  return compare < 0 ? minValueOfTimeUnit(unit) : to;
}

function minValueOfTimeUnit<TUnit extends TimeTickTimeframeUnit>(
  unit: TUnit,
): TimeTickTimeframe {
  switch (unit) {
    case 'm': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES[0],
      };
    }
    case 'h': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES[0],
      };
    }
    case 'D': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES[0],
      };
    }
    case 'M': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES[0],
      };
    }
    case 'Y': {
      return {
        unit,
        value: 1,
      };
    }
    default: {
      return ensureNever(unit);
    }
  }
}

function maxValueOfTimeUnit(unit: TimeTickTimeframeUnit): TimeTickTimeframe {
  switch (unit) {
    case 'm': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES.at(-1)!,
      };
    }
    case 'h': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES.at(-1)!,
      };
    }
    case 'D': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES.at(-1)!,
      };
    }
    case 'M': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES.at(-1)!,
      };
    }
    case 'Y': {
      invariant(false, 'There is no max value for year unit.');
    }
    default: {
      return ensureNever(unit);
    }
  }
}
