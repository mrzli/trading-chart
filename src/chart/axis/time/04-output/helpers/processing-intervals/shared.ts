import {
  LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES,
  LIST_OF_TIME_TICK_INTERVAL_HOUR_VALUES,
  LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES,
  LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES,
  LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS,
  TimeTickIntervalValue,
} from './../../../types';
import { TimeTickInterval, TimeTickIntervalTimeUnit } from '../../../types';
import { compareTimeTickIntervalTimeUnit } from '../../../util';
import { ensureNever, invariant } from '@gmjs/assert';

const LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS_REVERSED =
  LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS.toReversed();

export function getIntervalUnitRange(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickIntervalTimeUnit[] {
  return LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS_REVERSED.filter(
    (unit) =>
      compareTimeTickIntervalTimeUnit(unit, from.unit) <= 0 &&
      compareTimeTickIntervalTimeUnit(unit, to.unit) >= 0,
  );
}

export function clampToSingleTimeUnit<TUnit extends TimeTickIntervalTimeUnit>(
  from: TimeTickInterval,
  to: TimeTickInterval,
  unit: TUnit,
): readonly [TimeTickIntervalValue<TUnit>, TimeTickIntervalValue<TUnit>] {
  const clampedFrom = limitTimeUnitFromToMaxReferent(from, unit);
  const clampedTo = limitTimeUnitToToMinReferent(to, unit);
  invariant(
    clampedFrom.unit === unit && clampedTo.unit === unit,
    'Invalid clamped unit result.',
  );

  // TODO: type this better
  return [clampedFrom.value, clampedTo.value] as readonly [
    TimeTickIntervalValue<TUnit>,
    TimeTickIntervalValue<TUnit>,
  ];
}

function limitTimeUnitFromToMaxReferent(
  from: TimeTickInterval,
  unit: TimeTickIntervalTimeUnit,
): TimeTickInterval {
  const compare = compareTimeTickIntervalTimeUnit(from.unit, unit);
  return compare > 0 ? maxValueOfTimeUnit(unit) : from;
}

function limitTimeUnitToToMinReferent(
  to: TimeTickInterval,
  unit: TimeTickIntervalTimeUnit,
): TimeTickInterval {
  const compare = compareTimeTickIntervalTimeUnit(to.unit, unit);
  return compare < 0 ? minValueOfTimeUnit(unit) : to;
}

function minValueOfTimeUnit<TUnit extends TimeTickIntervalTimeUnit>(
  unit: TUnit,
): TimeTickInterval {
  switch (unit) {
    case 'm': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES[0],
      };
    }
    case 'h': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_HOUR_VALUES[0],
      };
    }
    case 'D': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES[0],
      };
    }
    case 'M': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES[0],
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

function maxValueOfTimeUnit(unit: TimeTickIntervalTimeUnit): TimeTickInterval {
  switch (unit) {
    case 'm': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES.at(-1)!,
      };
    }
    case 'h': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_HOUR_VALUES.at(-1)!,
      };
    }
    case 'D': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES.at(-1)!,
      };
    }
    case 'M': {
      return {
        unit,
        value: LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES.at(-1)!,
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
