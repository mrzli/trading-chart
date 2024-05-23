import { ensureNever } from '@gmjs/assert';
import { TimeAxisExtendedDataItem, TimeTickInterval } from '../../types';
import { getMultipleGte } from '../../../../helpers';

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
    case 'm': {
      return getMultipleGte(firstDate.minute, value);
    }
    case 'h': {
      return getMultipleGte(firstDate.hour, value);
    }
    case 'D': {
      return getMultipleGte(firstDate.day - 1, value) + 1;
    }
    case 'M': {
      return getMultipleGte(firstDate.month - 1, value) + 1;
    }
    case 'Y': {
      return getMultipleGte(firstDate.year, value);
    }
    default: {
      return ensureNever(unit);
    }
  }
}
