import { mapGetOrThrow } from '@gmjs/data-container-util';
import { DateObjectTz } from '@gmjs/date-util';
import { padNonNegativeIntWithZeroes } from '@gmjs/number-util';

export function formatAsYear(dateObject: DateObjectTz): string {
  return padNonNegativeIntWithZeroes(dateObject.year, 4);
}

export function formatAsMonth(dateObject: DateObjectTz): string {
  return formatAsMonthString(dateObject.month);
}

export function formatAsDay(dateObject: DateObjectTz): string {
  return dateObject.day.toString();
}

export function formatAsDate(dateObject: DateObjectTz): string {
  const yearString = padNonNegativeIntWithZeroes(dateObject.year, 4);
  const monthString = padNonNegativeIntWithZeroes(dateObject.month, 2);
  const dayString = padNonNegativeIntWithZeroes(dateObject.day, 2);

  return `${yearString}-${monthString}-${dayString}`;
}

export function formatAsHourMinute(dateObject: DateObjectTz): string {
  const hourString = padNonNegativeIntWithZeroes(dateObject.hour, 2);
  const minuteString = padNonNegativeIntWithZeroes(dateObject.minute, 2);

  return `${hourString}:${minuteString}`;
}

export function formatAsHourMinuteSecond(dateObject: DateObjectTz): string {
  const hourString = padNonNegativeIntWithZeroes(dateObject.hour, 2);
  const minuteString = padNonNegativeIntWithZeroes(dateObject.minute, 2);
  const secondString = padNonNegativeIntWithZeroes(dateObject.second, 2);

  return `${hourString}:${minuteString}:${secondString}`;
}

const WEEKYDAY_MAP: ReadonlyMap<number, string> = new Map([
  [1, 'Mon'],
  [2, 'Tue'],
  [3, 'Wed'],
  [4, 'Thu'],
  [5, 'Fri'],
  [6, 'Sat'],
  [7, 'Sun'],
]);

export function formatAsWeekdayString(weekday: number): string {
  return mapGetOrThrow(WEEKYDAY_MAP, weekday);
}

const MONTH_MAP: ReadonlyMap<number, string> = new Map([
  [1, 'Jan'],
  [2, 'Feb'],
  [3, 'Mar'],
  [4, 'Apr'],
  [5, 'May'],
  [6, 'Jun'],
  [7, 'Jul'],
  [8, 'Aug'],
  [9, 'Sep'],
  [10, 'Oct'],
  [11, 'Nov'],
  [12, 'Dec'],
]);

export function formatAsMonthString(month: number): string {
  return mapGetOrThrow(MONTH_MAP, month);
}
