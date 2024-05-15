import { TickValue } from '../types';
import { PriceAxisInput } from './types';

export function formatPrice(
  input: PriceAxisInput,
  tickValue: TickValue,
): string {
  return tickValue.value.toFixed(input.pricePrecision);
}
