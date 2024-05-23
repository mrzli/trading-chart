import { ensureNever } from '@gmjs/assert';
import { TimeTickInterval } from '../types';
import { getDaysInMonth, getMultipleGt } from '../../../helpers';
import {
  DateObjectTz,
  dateObjectTzAdd,
  dateObjectTzToUnixSeconds,
  unixSecondsToDateObjectTz,
} from '@gmjs/date-util';

export function getTimeTickPositionNext(
  time: number,
  timezone: string,
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
          return getMultipleGt(time, value * 60);
        }
        case 30: {
          const dateObject = unixSecondsToDateObjectTz(time, timezone);

          const adjustedDateObject: DateObjectTz = {
            ...dateObject,
            second: 0,
            millisecond: 0,
          };
          const increment =
            getMultipleGt(adjustedDateObject.minute, 30) -
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
      const dateObject = unixSecondsToDateObjectTz(time, timezone);

      const adjustedDateObject: DateObjectTz = {
        ...dateObject,
        minute: 0,
        second: 0,
        millisecond: 0,
      };
      const incrementNonDstAdjusted =
        getMultipleGt(adjustedDateObject.hour, value) - adjustedDateObject.hour;
      const newDateObjectNonDstAdjusted =
        incrementNonDstAdjusted === 0
          ? adjustedDateObject
          : dateObjectTzAdd(adjustedDateObject, {
              hours: incrementNonDstAdjusted,
            });

      const diffToNext =
        getMultipleGt(newDateObjectNonDstAdjusted.hour, value) -
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
      const dateObject = unixSecondsToDateObjectTz(time, 'UTC');

      const adjustedDateObject: DateObjectTz = {
        ...dateObject,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      };
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
      const dateObject = unixSecondsToDateObjectTz(time, 'UTC');

      const adjustedDateObject: DateObjectTz = {
        ...dateObject,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      };
      const increment =
        getMultipleGt(adjustedDateObject.month - 1, value) +
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
      const dateObject = unixSecondsToDateObjectTz(time, 'UTC');

      const newDateObject: DateObjectTz = {
        year: getMultipleGt(dateObject.year, value),
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

function getDayIncrement(dateObject: DateObjectTz, value: number): number {
  const daysInMonth = getDaysInMonth(dateObject);
  const nextDayUnadjusted = getMultipleGt(dateObject.day - 1, value) + 1;
  const nextDay =
    nextDayUnadjusted > daysInMonth - value + 1
      ? daysInMonth + 1
      : nextDayUnadjusted;

  return nextDay - dateObject.day;
}
