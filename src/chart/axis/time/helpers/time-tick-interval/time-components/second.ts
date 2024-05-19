import { Interval } from '../../../../../types';
import { getNextHigherIntervalFromMinutes } from './minute';

export function getNextHigherIntervalFromSeconds(input: number): Interval {
  if (input > 30) {
    return getNextHigherIntervalFromMinutes(input / 60);
  }

  return {
    unit: 's',
    value: 1,
  };
}
