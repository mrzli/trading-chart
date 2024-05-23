import { ensureNever } from '@gmjs/assert';
import { TimeAxisExtendedDataItem, TimeTickInterval } from '../types';
import { getDaysInMonth, getMultipleGte } from '../../../helpers';
import {
  DateObjectTz,
  dateObjectTzAdd,
  dateObjectTzToUnixSeconds,
  unixSecondsToDateObjectTz,
} from '@gmjs/date-util';

export function getTimeTickPositionFirst(
  extendedItem: TimeAxisExtendedDataItem,
  interval: TimeTickInterval,
): number {
  const { unit, value } = interval;

  switch (unit) {
    case 'm': {
      switch (value) {
        case 1:
        case 2:
        case 3:
        case 5:
        case 10:
        case 15: {
          return getMultipleGte(extendedItem.value, value * 60);
        }
        case 30: {
          const dateObject = extendedItem.dateObject;
          const adjustedDateObject = isBeginningOfMinute(dateObject)
            ? dateObject
            : dateObjectTzAdd(
                { ...dateObject, second: 0, millisecond: 0 },
                {
                  minutes: 1,
                },
              );
          const increment =
            getMultipleGte(adjustedDateObject.minute, 30) -
            adjustedDateObject.minute;
          const newDateObject =
            increment === 0
              ? adjustedDateObject
              : dateObjectTzAdd(adjustedDateObject, {
                  minutes: increment,
                });
          return dateObjectTzToUnixSeconds(newDateObject);
        }
        default: {
          return ensureNever(value);
        }
      }
    }
    case 'h': {
      const dateObject = extendedItem.dateObject;
      const adjustedDateObject = isBeginningOfHour(dateObject)
        ? dateObject
        : dateObjectTzAdd(
            { ...dateObject, minute: 0, second: 0, millisecond: 0 },
            {
              hours: 1,
            },
          );
      const incrementNonDstAdjusted =
        getMultipleGte(adjustedDateObject.hour, value) -
        adjustedDateObject.hour;
      const newDateObjectNonDstAdjusted =
        incrementNonDstAdjusted === 0
          ? adjustedDateObject
          : dateObjectTzAdd(adjustedDateObject, {
              hours: incrementNonDstAdjusted,
            });

      const diffToNext =
        getMultipleGte(newDateObjectNonDstAdjusted.hour, value) -
        newDateObjectNonDstAdjusted.hour;

      // increment (or decrement) to the closer multiple after DST
      const increment =
        diffToNext >= value / 2 ? diffToNext - value : diffToNext;

      const newDateObject =
        newDateObjectNonDstAdjusted.hour % value === 0
          ? newDateObjectNonDstAdjusted
          : dateObjectTzAdd(newDateObjectNonDstAdjusted, {
              hours: increment,
            });

      return dateObjectTzToUnixSeconds(newDateObject);
    }
    case 'D': {
      // use UTC for days and above, regardless of the timezone
      const dateObject = getUtcDateObject(extendedItem);
      const adjustedDateObject = isBeginningOfDay(dateObject)
        ? dateObject
        : dateObjectTzAdd(
            {
              ...dateObject,
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0,
            },
            {
              days: 1,
            },
          );
      const increment = getDayIncrement(adjustedDateObject, value);
      const newDateObject =
        increment === 0
          ? adjustedDateObject
          : dateObjectTzAdd(adjustedDateObject, {
              days: increment,
            });
      return dateObjectTzToUnixSeconds(newDateObject);
    }
    case 'M': {
      // use UTC for days and above, regardless of the timezone
      const dateObject = getUtcDateObject(extendedItem);
      const adjustedDateObject = isBeginningOfMonth(dateObject)
        ? dateObject
        : dateObjectTzAdd(
            {
              ...dateObject,
              day: 1,
              hour: 0,
              minute: 0,
              second: 0,
              millisecond: 0,
            },
            {
              months: 1,
            },
          );
      const increment =
        getMultipleGte(adjustedDateObject.month - 1, value) +
        1 -
        adjustedDateObject.month;
      const newDateObject =
        increment === 0
          ? adjustedDateObject
          : dateObjectTzAdd(adjustedDateObject, {
              months: increment,
            });
      return dateObjectTzToUnixSeconds(newDateObject);
    }
    case 'Y': {
      // use UTC for days and above, regardless of the timezone
      const dateObject = getUtcDateObject(extendedItem);
      const adjustedYear = isBeginningOfYear(dateObject)
        ? dateObject.year
        : dateObject.year + 1;

      const newDateObject: DateObjectTz = {
        year: getMultipleGte(adjustedYear, value),
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
        timezone: dateObject.timezone,
      };

      return dateObjectTzToUnixSeconds(newDateObject);
    }
    default: {
      return ensureNever(unit);
    }
  }
}

function isBeginningOfYear(dateObject: DateObjectTz): boolean {
  return (
    dateObject.month === 1 &&
    dateObject.day === 1 &&
    dateObject.hour === 0 &&
    dateObject.minute === 0 &&
    dateObject.second === 0 &&
    dateObject.millisecond === 0
  );
}

function isBeginningOfMonth(dateObject: DateObjectTz): boolean {
  return (
    dateObject.day === 1 &&
    dateObject.hour === 0 &&
    dateObject.minute === 0 &&
    dateObject.second === 0 &&
    dateObject.millisecond === 0
  );
}

function isBeginningOfDay(dateObject: DateObjectTz): boolean {
  return (
    dateObject.hour === 0 &&
    dateObject.minute === 0 &&
    dateObject.second === 0 &&
    dateObject.millisecond === 0
  );
}

function isBeginningOfHour(dateObject: DateObjectTz): boolean {
  return (
    dateObject.minute === 0 &&
    dateObject.second === 0 &&
    dateObject.millisecond === 0
  );
}

function isBeginningOfMinute(dateObject: DateObjectTz): boolean {
  return dateObject.second === 0 && dateObject.millisecond === 0;
}

function getUtcDateObject(
  extendedItem: TimeAxisExtendedDataItem,
): DateObjectTz {
  const { value, dateObject } = extendedItem;
  return dateObject.timezone === 'UTC'
    ? dateObject
    : unixSecondsToDateObjectTz(value, 'UTC');
}

function getDayIncrement(dateObject: DateObjectTz, value: number): number {
  const daysInMonth = getDaysInMonth(dateObject);
  const nextDayUnadjusted = getMultipleGte(dateObject.day - 1, value) + 1;
  const nextDay =
    nextDayUnadjusted > daysInMonth - value + 1
      ? daysInMonth + 1
      : nextDayUnadjusted;

  return nextDay - dateObject.day;
}
