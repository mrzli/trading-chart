import { TimeAxisExtendedDataItem } from '../../types';
import { TimeComponentChange } from '../types';

export function getMaxTimeComponentChange(
  extendedItems: readonly TimeAxisExtendedDataItem[],
): TimeComponentChange {
  if (extendedItems.length <= 1) {
    return 'none';
  }

  const first = extendedItems[0].dateObject;
  const last = extendedItems.at(-1)!.dateObject;

  if (first.year !== last.year) {
    return 'year';
  } else if (first.month !== last.month) {
    return 'month';
  } else if (first.day !== last.day) {
    return 'day';
  }
  // eslint-disable-next-line unicorn/no-negated-condition
  else if (first.minute !== last.minute) {
    return 'minute';
  } else {
    return 'none';
  }
}
