import { ensureNever } from '@gmjs/assert';
import { TimeAxisExtendedDataItem, TimeTickInterval } from '../../types';
import { getNextHigherMultiple } from '../../../../helpers';

export function getFirstTickValue(
  extendedItems: readonly TimeAxisExtendedDataItem[],
  interval: TimeTickInterval,
): number {
  if (extendedItems.length === 0) {
    return 0;
  }

  const { unit, value } = interval;

  const firstDate = extendedItems[0].dateObject;

  switch (unit) {
    case 's': {
      return getNextHigherMultiple(firstDate.second, value);
    }
    case 'm': {
      return getNextHigherMultiple(firstDate.minute, value);
    }
    case 'h': {
      return getNextHigherMultiple(firstDate.hour, value);
    }
    case 'D': {
      return getNextHigherMultiple(firstDate.day - 1, value) + 1;
    }
    case 'M': {
      return getNextHigherMultiple(firstDate.month - 1, value) + 1;
    }
    case 'Y': {
      return getNextHigherMultiple(firstDate.year, value);
    }
    default: {
      return ensureNever(unit);
    }
  }
}
