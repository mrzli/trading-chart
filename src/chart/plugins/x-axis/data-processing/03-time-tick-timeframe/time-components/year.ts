import {
  getNextHigherValueWithOrderOfMagnitude,
  getOrderOfMagnitudeMultiplier,
} from '../../../../../util';
import { TimeTickTimeframe } from '../../types';

export function getNextHigherTimeframeFromYears(
  input: number,
): TimeTickTimeframe {
  const multiplier = getOrderOfMagnitudeMultiplier(input);
  const normalizedYears = input / multiplier;
  const result = getNextHigherValueWithOrderOfMagnitude(
    normalizedYears,
    multiplier,
    CUTOFFS,
  );

  const value = Math.max(result, 1);

  return {
    unit: 'Y',
    value,
  };
}

const CUTOFFS = [5, 2, 1] as const;
