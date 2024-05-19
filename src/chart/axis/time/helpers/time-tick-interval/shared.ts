import { getSignificantDigitIndex } from '../../../../helpers';

export function getMinValuePerTick(
  valuePerPixel: number,
  valuePerItem: number,
  minTickDistance: number,
): number {
  const fractionalValuePerTick = valuePerPixel * minTickDistance;
  const integerValuePerTick = Math.ceil(fractionalValuePerTick);

  const minValuePerTick = Math.max(integerValuePerTick, valuePerItem, 1);

  return minValuePerTick;
}

export function getOrderOfMagnitude(value: number): number {
  const significantDigitIndex = getSignificantDigitIndex(value);
  return Math.pow(10, significantDigitIndex);
}

export function getNextHigherValue(
  value: number,
  cutoffs: readonly number[],
  maxValue: number,
): number {
  for (const [i, cutoff] of cutoffs.entries()) {
    if (value > cutoff) {
      return i === 0 ? maxValue : cutoffs[i - 1];
    }
  }

  return cutoffs.at(-1)!;
}

export function getNextHigherValueWithOrderOfMagnitude(
  normalizedValue: number,
  orderOfMagnitude: number,
  cutoffs: readonly number[],
): number {
  const maxValue = cutoffs.at(-1)! * 10;
  const normalizedResult = getNextHigherValue(
    normalizedValue,
    cutoffs,
    maxValue,
  );
  return normalizedResult * orderOfMagnitude;
}
