import { TickValue } from '../../../types';
import { NumericAxisInput } from './types';

export function formatNumber(
  input: NumericAxisInput,
  tickValue: TickValue,
): string {
  return tickValue.value.toFixed(input.precision);
}
