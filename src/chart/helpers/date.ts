import { DateTime } from 'luxon';
import { DateObjectTz } from '@gmjs/date-util';
import { invariant } from '@gmjs/assert';

export function getDaysInMonth(dateObject: DateObjectTz): number {
  const { year, month } = dateObject;
  const daysInMonth = DateTime.local(year, month).daysInMonth;
  invariant(
    daysInMonth !== undefined,
    'Invalid date for daysInMonth calculation',
  );
  return daysInMonth;
}
