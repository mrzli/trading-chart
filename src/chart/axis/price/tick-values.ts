import { round } from '@gmjs/number-util';
import { getSignificantDigitIndex } from '../../helpers';
import { PriceAxisInput } from './types';
import { TickValue } from '../types';

const MAX_PRECISION = 10;

export function getPriceAxisTickValues(
  input: PriceAxisInput,
): readonly TickValue[] {
  const { minTickDistance, range, axisLength, pricePrecision } = input;

  const { from, to } = range;
  const priceDiff = to - from;
  const pricePerPixel = priceDiff / axisLength;

  const minPriceDiffPerTick = pricePerPixel * minTickDistance;
  const pricePerTick = getNextHigherPricePerTick(
    minPriceDiffPerTick,
    pricePrecision,
  );

  const firstPriceMultiple = Math.ceil(
    round(from / pricePerTick, MAX_PRECISION),
  );
  const lastPriceMultiple = Math.floor(round(to / pricePerTick, MAX_PRECISION));

  const tickValues: TickValue[] = [];
  for (let i = firstPriceMultiple; i <= lastPriceMultiple; i++) {
    const price = i * pricePerTick;
    tickValues.push({
      value: round(price, pricePrecision),
      offset: axisLength - Math.round((price - from) / pricePerPixel),
    });
  }

  return tickValues;
}

function getNextHigherPricePerTick(
  referentPrice: number,
  pricePrecision: number,
): number {
  const significantDigitIndex = getSignificantDigitIndex(referentPrice);
  if (significantDigitIndex < -pricePrecision) {
    return Math.pow(10, -pricePrecision);
  }

  const orderOfMagnitude = Math.pow(10, significantDigitIndex);

  // normalizes all prices to have the significant digit at index 0
  // examples:
  // 12345 -> 1.2345
  // 0.12345 -> 1.2345
  // etc
  const normalizedPrice = referentPrice / orderOfMagnitude;

  if (normalizedPrice > 5) {
    return 10 * orderOfMagnitude;
  } else if (normalizedPrice > 4) {
    return 5 * orderOfMagnitude;
  } else if (normalizedPrice > 2.5 && significantDigitIndex >= 1) {
    return 4 * orderOfMagnitude;
  } else if (normalizedPrice > 2) {
    return significantDigitIndex >= 1
      ? 2.5 * orderOfMagnitude
      : 4 * orderOfMagnitude;
  } else if (normalizedPrice > 1) {
    return 2 * orderOfMagnitude;
  } else {
    // exactly 1
    return orderOfMagnitude;
  }
}
