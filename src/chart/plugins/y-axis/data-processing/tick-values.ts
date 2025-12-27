import { round } from '@gmjs/number-util';
import { NumericAxisInput } from './types';
import { TickValue } from '../../../types';
import {
  getNextHigherValue,
  getNextHigherValueWithOrderOfMagnitude,
  getNormalizedValue,
} from '../../../util';

const MAX_PRECISION = 10;

export function getNumericAxisTickValues(
  input: NumericAxisInput,
): readonly TickValue[] {
  const { minTickDistance, range, axisLength, precision, tickSize } = input;

  const { from, to } = range;
  const priceDiff = to - from;
  const pricePerPixel = priceDiff / axisLength;

  const minPriceDiffPerTick = pricePerPixel * minTickDistance;
  const pricePerTick = getNextHigherNumberPerTick(
    minPriceDiffPerTick,
    precision,
    tickSize,
  );

  const firstPriceMultiple = Math.ceil(
    round(from / pricePerTick, MAX_PRECISION),
  );
  const lastPriceMultiple = Math.floor(round(to / pricePerTick, MAX_PRECISION));

  const tickValues: TickValue[] = [];
  for (let i = firstPriceMultiple; i <= lastPriceMultiple; i++) {
    const price = i * pricePerTick;

    const item: TickValue = {
      value: round(price, precision),
      offset: Math.round(axisLength - (price - from) / pricePerPixel),
    };

    tickValues.push(item);
  }

  return tickValues;
}

function getNextHigherNumberPerTick(
  referentNumber: number,
  precision: number,
  tickSize: number,
): number {
  const normalizedPrice = getNormalizedValue(referentNumber);
  const { normalizedValue, orderOfMagnitude, multiplier } = normalizedPrice;

  if (orderOfMagnitude < -precision) {
    return Math.pow(10, -precision);
  }

  const normalizedTick = getNormalizedValue(tickSize);
  const {
    normalizedValue: normalizedValueTick,
    orderOfMagnitude: orderOfMagnitudeTick,
  } = normalizedTick;

  if (orderOfMagnitude < orderOfMagnitudeTick) {
    return tickSize;
  } else if (
    orderOfMagnitude === orderOfMagnitudeTick &&
    normalizedValueTick === 2.5
  ) {
    const normalizedResult = getNextHigherValue(
      normalizedValue,
      CUTOFFS_25,
      10,
    );

    return normalizedResult * multiplier;
  }

  const cutoffs = orderOfMagnitude >= 1 ? CUTOFFS_OOM_GTE_1 : CUTOFFS_OOM_LT_1;

  const result = getNextHigherValueWithOrderOfMagnitude(
    normalizedValue,
    multiplier,
    cutoffs,
  );

  return result;
}

const CUTOFFS_OOM_GTE_1 = [5, 4, 2.5, 2, 1] as const;
const CUTOFFS_OOM_LT_1 = [5, 4, 2, 1] as const;

const CUTOFFS_25 = [5, 2.5] as const;
