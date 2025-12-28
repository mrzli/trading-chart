import { ensureNever } from '@gmjs/assert';
import { binarySearchIndexLte } from '@gmjs/binary-search';
import { DateObjectTz } from '@gmjs/date-util';
import {
  TimeAxisInput,
  TimeTickTimeframe,
  LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES,
  LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES,
} from '../../../types';
import {
  compareTimeTickTimeframeUnit,
  maxTimeTickTimeframe,
} from '../../../util';

export function getTimeAxisProcessingTimeframeRangeInternal(
  timeTickTimeframe: TimeTickTimeframe,
  dataTimeframe: TimeAxisInput['timeframe'],
  dateBeforeFirst: DateObjectTz | undefined,
  dateLast: DateObjectTz,
): readonly [TimeTickTimeframe, TimeTickTimeframe] {
  const dateRangeTimeTickTimeframe = getDateRangeTimeTickTimeframe(
    dateBeforeFirst,
    dateLast,
  );

  const from = maxTimeTickTimeframe(
    timeTickTimeframe,
    dateRangeTimeTickTimeframe,
  );

  const isMinuteOrSmallerTimeTickTimeframe =
    compareTimeTickTimeframeUnit(timeTickTimeframe.unit, 'm') <= 0;
  const to = isMinuteOrSmallerTimeTickTimeframe
    ? timeTickTimeframe
    : getNextLowerTimeTickTimeframe(dataTimeframe);

  return [from, to];
}

function getNextLowerTimeTickTimeframe(
  timeframe: TimeAxisInput['timeframe'],
): TimeTickTimeframe {
  const { unit, value } = timeframe;

  switch (unit) {
    case 's': {
      return {
        unit: 'm',
        value: 1,
      };
    }
    case 'm': {
      return {
        unit: 'm',
        value: getNextSmallerValue(
          value,
          LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES,
        ),
      };
    }
    case 'h': {
      return {
        unit: 'h',
        value: getNextSmallerValue(
          value,
          LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES,
        ),
      };
    }
    case 'D': {
      return {
        unit: 'D',
        value: getNextSmallerValue(
          value,
          LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES,
        ),
      };
    }
    case 'W': {
      return {
        unit: 'D',
        value: getNextSmallerValue(
          value * 7,
          LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES,
        ),
      };
    }
    case 'M': {
      return {
        unit: 'M',
        value: getNextSmallerValue(
          value,
          LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES,
        ),
      };
    }
    case 'Y': {
      return {
        unit: 'Y',
        value: 1,
      };
    }
    default: {
      return ensureNever(unit);
    }
  }
}

function getNextSmallerValue<TValue extends number>(
  value: number,
  list: readonly TValue[],
): TValue {
  const index = binarySearchIndexLte(value, list);
  return index >= 0 ? list[index] : list[0];
}

function getDateRangeTimeTickTimeframe(
  dateBeforeFirst: DateObjectTz | undefined,
  dateLast: DateObjectTz,
): TimeTickTimeframe {
  const yearChange =
    dateBeforeFirst === undefined || dateBeforeFirst.year !== dateLast.year;
  if (yearChange) {
    return {
      unit: 'Y',
      value: 1,
    };
  }

  const monthChange = dateBeforeFirst.month !== dateLast.month;
  if (monthChange) {
    return {
      unit: 'M',
      value: LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES.at(-1)!,
    };
  }

  const dayChange = dateBeforeFirst.day !== dateLast.day;
  if (dayChange) {
    return {
      unit: 'D',
      value: LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES.at(-1)!,
    };
  }

  return {
    unit: 'D',
    value: LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES[0],
  };
}
