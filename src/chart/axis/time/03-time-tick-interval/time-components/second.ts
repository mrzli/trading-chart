import { TimeTickInterval } from '../../types';
import { getNextHigherIntervalFromMinutes } from './minute';

export function getNextHigherIntervalFromSeconds(
  input: number,
): TimeTickInterval {
  return getNextHigherIntervalFromMinutes(input / 60);
}
