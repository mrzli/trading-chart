import {
  Duration,
  isoDateTimeToUnixSeconds,
  unixSecondsAdd,
} from '@gmjs/date-util';
import { Interval, Ohlc } from '../../chart';

const START_DATE = isoDateTimeToUnixSeconds('2020-01-01T00:00:00Z');

export function convertRawOhlcDataToInterval(
  data: readonly Omit<Ohlc, 'time'>[],
  interval: Interval,
): readonly Ohlc[] {
  const result: Ohlc[] = [];

  const currentDate = START_DATE;

  for (let i = 0; i < data.length; i += interval.value) {
    const duration = intervalToDuration(interval, i);
    const time = unixSecondsAdd(currentDate, 'UTC', duration);

    const item: Ohlc = {
      time,
      ...data[i],
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
