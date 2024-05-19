import { DateTime } from 'luxon';
import { DateObjectTz } from '@gmjs/date-util';

export function dateObjectToWeekday(dateObject: DateObjectTz): number {
  const { year, month, day } = dateObject;
  return DateTime.local(year, month, day).weekday;
}
