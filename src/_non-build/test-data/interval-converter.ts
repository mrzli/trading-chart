import { Duration, unixSecondsAdd } from '@gmjs/date-util';
import { Interval, Ohlc } from '../../chart';

export function convertRawOhlcDataToInterval(
  data: readonly Omit<Ohlc, 'time'>[],
  startDate: number,
  interval: Interval,
): readonly Ohlc[] {
  const result: Ohlc[] = [];

  for (const [i, rawItem] of data.entries()) {
    const duration = intervalToDuration(interval, i);
    const time = unixSecondsAdd(startDate, 'UTC', duration);

    const item: Ohlc = {
      time,
      ...rawItem,
    };

    result.push(item);
  }

  return result;
}

function intervalToDuration(interval: Interval, multiplier: number): Duration {
  const value = interval.value * multiplier;

  switch (interval.unit) {
    case 's': {
      return { seconds: value };
    }
    case 'm': {
      return { minutes: value };
    }
    case 'h': {
      return { hours: value };
    }
    case 'D': {
      return { days: value };
    }
    case 'W': {
      return { weeks: value };
    }
    case 'M': {
      return { months: value };
    }
    case 'Y': {
      return { years: value };
    }
  }
}
