import { Duration, unixSecondsAdd } from '@gmjs/date-util';
import { Interval, Ohlc } from '../../chart';

export function convertRawOhlcDataToInterval(
  data: readonly Omit<Ohlc, 'time'>[],
  startDate: number,
  interval: Interval,
  gapPattern: readonly number[],
): readonly Ohlc[] {
  const result: Ohlc[] = [];

  let offset = 0;

  for (const [i, rawItem] of data.entries()) {
    const duration = intervalToDuration(interval, offset);
    const time = unixSecondsAdd(startDate, 'UTC', duration);

    const item: Ohlc = {
      time,
      ...rawItem,
    };

    result.push(item);

    const currentGap =
      gapPattern.length > 0 ? gapPattern[i % gapPattern.length] : 0;
    offset += 1 + currentGap;
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
