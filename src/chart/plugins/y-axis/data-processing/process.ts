import { applyFn } from '@gmjs/apply-function';
import { map, toArray } from '@gmjs/value-transformers';
import { TickValue } from '../../../types';
import { formatNumber } from './formatting';
import { getNumericAxisTickValues } from './tick-values';
import { NumericAxisInput, NumericAxisOutputItem } from './types';

export function processNumericAxisData(
  input: NumericAxisInput,
): readonly NumericAxisOutputItem[] {
  const result = applyFn(
    input,
    (v) => getNumericAxisTickValues(v),
    map<TickValue, NumericAxisOutputItem>((v) => ({
      offset: v.offset,
      value: v.value,
      label: formatNumber(input, v),
    })),
    toArray(),
  );

  return result;
}
