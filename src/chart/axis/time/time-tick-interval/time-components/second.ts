import { TimeTickInterval } from '../types';
import { getNextHigherIntervalFromMinutes } from './minute';

export function getNextHigherIntervalFromSeconds(
  input: number,
): TimeTickInterval {
  if (input > 30) {
    return getNextHigherIntervalFromMinutes(input / 60);
  }

  return {
    unit: 's',
    value: 1,
  };
}
