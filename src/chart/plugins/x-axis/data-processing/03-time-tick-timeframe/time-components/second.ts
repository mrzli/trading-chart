import { TimeTickTimeframe } from '../../types';
import { getNextHigherTimeframeFromMinutes } from './minute';

export function getNextHigherTimeframeFromSeconds(
  input: number,
): TimeTickTimeframe {
  return getNextHigherTimeframeFromMinutes(input / 60);
}
