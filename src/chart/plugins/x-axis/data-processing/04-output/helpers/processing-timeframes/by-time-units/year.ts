import { invariant } from '@gmjs/assert';
import { getOrderOfMagnitudeMultiplier } from '../../../../../../../util';
import { TimeTickTimeframe } from '../../../../types';
import { clampToSingleTimeframeUnit } from '../shared';

export function getTimeAxisProcessingTimeframesYear(
  from: TimeTickTimeframe,
  to: TimeTickTimeframe,
): readonly TimeTickTimeframe[] {
  const [fromValue, toValue] = clampToSingleTimeframeUnit(from, to, 'Y');

  const values = getYearIntervalValues(fromValue, toValue);

  const timeframes: readonly TimeTickTimeframe[] = values.map((v) => ({
    unit: 'Y',
    value: v,
  }));

  return timeframes;
}

const NON_LEADING_BASE_VALUES: readonly number[] = [5, 1];

function getYearIntervalValues(from: number, to: number): readonly number[] {
  let multiplier = getOrderOfMagnitudeMultiplier(from);
  const significantDigit = from / multiplier;
  const baseValues = getYearIntervalValuesBase(significantDigit);

  const result: number[] = baseValues.map((v) => v * multiplier);

  while (multiplier > 1) {
    multiplier /= 10;
    const newValues = NON_LEADING_BASE_VALUES.map((v) => v * multiplier);
    result.push(...newValues);
  }

  const filteredResult = result.filter((v) => v >= to);

  return filteredResult;
}

function getYearIntervalValuesBase(from: number): readonly number[] {
  switch (from) {
    case 1: {
      return [1];
    }
    case 2: {
      return [2, 1];
    }
    case 5: {
      return [5, 1];
    }
    default: {
      invariant(false, `Unexpected year base interval value: ${from}`);
    }
  }
}
