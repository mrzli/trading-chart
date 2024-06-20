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

export function getNextHigherValue<
  TValues extends readonly number[],
  TMaxValue extends number,
>(
  value: number,
  cutoffs: TValues,
  maxValue: TMaxValue,
): TValues[number] | TMaxValue {
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
