import { ensureNever } from '@gmjs/assert';
import {
  formatAsYear,
  formatAsMonth,
  formatAsDay,
  formatAsHourMinute,
} from '../../../../helpers';
import { TimeAxisExtendedDataItem, TimeAxisOutputItem } from '../../types';
import { TimeDisplayType } from '../types';

export function toTimeAxisOutputItem(
  item: TimeAxisExtendedDataItem,
  timeDisplayType: TimeDisplayType,
): TimeAxisOutputItem {
  const label = formatTime(item, timeDisplayType);

  return {
    offset: item.offset,
    value: item.value,
    dateObject: item.dateObject,
    label,
  };
}

function formatTime(
  item: TimeAxisExtendedDataItem,
  timeComponentChange: TimeDisplayType,
): string {
  switch (timeComponentChange) {
    case 'year': {
      return formatAsYear(item.dateObject);
    }
    case 'month': {
      return formatAsMonth(item.dateObject);
    }
    case 'day': {
      return formatAsDay(item.dateObject);
    }
    case 'minute': {
      return formatAsHourMinute(item.dateObject);
    }
    case 'none': {
      return '';
    }
    default: {
      return ensureNever(timeComponentChange);
    }
  }
}
