import { applyFn } from '@gmjs/apply-function';
import { map, toArray } from '@gmjs/value-transformers';
import { TickValue } from '../types';
import { formatPrice } from './formatting';
import { getPriceAxisTickValues } from './tick-values';
import { PriceAxisInput } from './types';
import { PriceAxisOutputItem } from './types/price-axis-output-item';

export function processPriceAxisData(
  input: PriceAxisInput,
): readonly PriceAxisOutputItem[] {
  const result = applyFn(
    input,
    (v) => getPriceAxisTickValues(v),
    map<TickValue, PriceAxisOutputItem>((v) => ({
      offset: v.offset,
      value: v.value,
      label: formatPrice(input, v),
    })),
    toArray(),
  );

  return result;
}
