import { ensureNever } from '@gmjs/assert';
import { TimeAxisExtendedDataItem, TimeTickInterval } from '../../types';
import { TimeComponentChange } from '../types';

export function getTimeComponentChange(
  item: TimeAxisExtendedDataItem,
  interval: TimeTickInterval,
): TimeComponentChange {
  const { dateObject, previousDateObject } = item;

  if (previousDateObject === undefined) {
    const { unit } = interval;

    switch (unit) {
      case 'm':
      case 'h': {
        return 'minute';
      }
      case 'D': {
        return 'day';
      }
      case 'M': {
        return 'month';
      }
      case 'Y': {
        return 'year';
      }
      default: {
        return ensureNever(unit);
      }
    }
  }

  if (dateObject.year !== previousDateObject.year) {
    return 'year';
  } else if (dateObject.month !== previousDateObject.month) {
    return 'month';
  }
  // eslint-disable-next-line unicorn/no-negated-condition
  else if (dateObject.day !== previousDateObject.day) {
    return 'day';
  } else {
    return 'minute';
  }
}
