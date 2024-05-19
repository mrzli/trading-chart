import { Interval } from '../../../../../types';
import {
  getNextHigherValueWithOrderOfMagnitude,
  getOrderOfMagnitude,
} from '../shared';

export function getNextHigherIntervalFromYears(input: number): Interval {
  const orderOfMagnitude = getOrderOfMagnitude(input);
  const normalizedYears = input / orderOfMagnitude;
  const result = getNextHigherValueWithOrderOfMagnitude(
    normalizedYears,
    orderOfMagnitude,
    CUTOFFS,
  );

  const value = Math.max(result, 1);

  return {
    unit: 'Y',
    value,
  };
}

const CUTOFFS: readonly number[] = [5, 4, 2, 1];
