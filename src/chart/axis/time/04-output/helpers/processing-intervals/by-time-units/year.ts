import { invariant } from '@gmjs/assert';
import { getOrderOfMagnitude } from '../../../../../../helpers';
import { TimeTickInterval } from '../../../../types';
import { clampToSingleTimeUnit } from '../shared';

export function getTimeAxisProcessingIntervalsYear(
  from: TimeTickInterval,
  to: TimeTickInterval,
): readonly TimeTickInterval[] {
  const [fromValue, toValue] = clampToSingleTimeUnit(from, to, 'Y');

  const values = getYearIntervalValues(fromValue, toValue);

  const intervals: readonly TimeTickInterval[] = values.map((v) => ({
    unit: 'Y',
    value: v,
  }));

  return intervals;
}

const NON_LEADING_BASE_VALUES: readonly number[] = [5, 1];

function getYearIntervalValues(from: number, to: number): readonly number[] {
  let orderOfMagnitude = getOrderOfMagnitude(from);
  const significantDigit = from / orderOfMagnitude;
  const baseValues = getYearIntervalValuesBase(significantDigit);

  const result: number[] = baseValues.map((v) => v * orderOfMagnitude);

  while (orderOfMagnitude > 1) {
    orderOfMagnitude /= 10;
    const newValues = NON_LEADING_BASE_VALUES.map((v) => v * orderOfMagnitude);
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
