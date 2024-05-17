import { ensureNever, invariant } from '@gmjs/assert';
import { IntervalOld, NormalInterval, TickInterval } from '../../../types';
import { MIN_X_AXIS_TICK_DISTANCE } from '../../../helpers/constants';

export function getTimePerTick(
  itemSpan: number,
  axisLength: number,
  interval: IntervalOld,
): TickInterval {
  const normalizedInterval = normalizeInterval(interval);

  const minIntervalPerTick = getMinIntervalPerTick(
    normalizedInterval,
    itemSpan,
    axisLength,
  );

  return getNextHigherIntervalPerTick(minIntervalPerTick);
}

function normalizeInterval(interval: IntervalOld): NormalInterval {
  const { unit, value } = interval;

  switch (unit) {
    case 'Y': {
      return {
        unit: 'Y',
        value,
      };
    }
    case 'M': {
      return {
        unit: 'M',
        value,
      };
    }
    case 'W': {
      return {
        unit: 'D',
        value: value * WEEK_TO_DAY,
      };
    }
    case 'D': {
      return {
        unit: 'D',
        value,
      };
    }
    case 'h': {
      return {
        unit: 's',
        value: value * HOUR_TO_SEC,
      };
    }
    case 'm': {
      return {
        unit: 's',
        value: value * MIN_TO_SEC,
      };
    }
    case 's': {
      return {
        unit: 's',
        value,
      };
    }
    default: {
      return ensureNever(unit);
    }
  }
}

function getMinIntervalPerTick(
  normalizedInterval: NormalInterval,
  itemSpan: number,
  axisLength: number,
): NormalInterval {
  const itemWidth = axisLength / itemSpan;

  if (itemWidth >= MIN_X_AXIS_TICK_DISTANCE) {
    return normalizedInterval;
  }

  const intervalPerPixel = normalizedIntervalToPerPixel(
    normalizedInterval,
    itemSpan,
    axisLength,
  );

  const minIntervalPerTick: NormalInterval = {
    unit: intervalPerPixel.unit,
    value: intervalPerPixel.value * MIN_X_AXIS_TICK_DISTANCE,
  };

  return minIntervalPerTick;
}

function normalizedIntervalToPerPixel(
  normalizedInterval: NormalInterval,
  axisLength: number,
  itemSpan: number,
): NormalInterval {
  const { unit, value } = normalizedInterval;

  const perPixelValue = (value * axisLength) / itemSpan;

  return {
    unit,
    value: perPixelValue,
  };
}

function getNextHigherIntervalPerTick(
  minIntervalPerTick: NormalInterval,
): TickInterval {
  const { unit, value } = minIntervalPerTick;

  switch (unit) {
    case 'Y': {
      return {
        unit: 'Y',
        value: Math.ceil(value),
      };
    }
    case 'M': {
      const isMonthDisplay = value <= 6;
      return isMonthDisplay
        ? {
            unit: 'M',
            value: getNextHigherMonthValue(value),
          }
        : {
            unit: 'Y',
            value: Math.ceil(value / YEAR_TO_MONTH),
          };
    }
    case 'D': {
      return {
        unit: 'D',
        value: Math.ceil(value),
      };
    }
    case 's': {
      return getNextHigherSecondInterval(value);
    }
    default: {
      return ensureNever(unit);
    }
  }
}

function getNextHigherMonthValue(value: number): 1 | 3 | 6 {
  if (value <= 1) {
    return 1;
  } else if (value <= 3) {
    return 3;
  } else {
    return 6;
  }
}

function getNextHigherSecondInterval(value: number): TickInterval {
  if (value < MIN_TO_SEC) {
    return {
      unit: 's',
      value: 1,
    };
  } else if (value === MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 1,
    };
  } else if (value <= 2 * MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 2,
    };
  } else if (value <= 5 * MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 5,
    };
  } else if (value <= 10 * MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 10,
    };
  } else if (value <= 15 * MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 15,
    };
  } else if (value <= 30 * MIN_TO_SEC) {
    return {
      unit: 'm',
      value: 30,
    };
  } else if (value <= HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 1,
    };
  } else if (value <= 2 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 2,
    };
  } else if (value <= 3 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 3,
    };
  } else if (value <= 4 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 4,
    };
  } else if (value <= 6 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 6,
    };
  } else if (value <= 8 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 8,
    };
  } else if (value <= 12 * HOUR_TO_SEC) {
    return {
      unit: 'h',
      value: 12,
    };
  } else {
    invariant(false, 'Invalid second interval value.');
  }
}

const MIN_TO_SEC = 60;
const HOUR_TO_MIN = 60;
const HOUR_TO_SEC = MIN_TO_SEC * HOUR_TO_MIN;
const WEEK_TO_DAY = 7;
const YEAR_TO_MONTH = 12;
