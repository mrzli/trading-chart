import { getNextHigherValueWithOrderOfMagnitude } from '../shared';
import { TimeTickInterval } from '../../types';
import { getOrderOfMagnitude } from '../../../../helpers';

export function getNextHigherIntervalFromYears(
  input: number,
): TimeTickInterval {
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

const CUTOFFS = [5, 2, 1] as const;
