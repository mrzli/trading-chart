export function getNumIntegerDigits(value: number): number {
  const log = Math.log10(Math.abs(value));
  return Math.max(Math.floor(log), 0) + 1;
}

export function getOrderOfMagnitude(value: number): number {
  const v = Math.abs(value);
  return Math.floor(Math.log10(v));
}

export function getOrderOfMagnitudeMultiplier(value: number): number {
  const significantDigitIndex = getOrderOfMagnitude(value);
  return Math.pow(10, significantDigitIndex);
}

export function getMultipleGt(value: number, multiple: number): number {
  const division = value / multiple;
  const isInteger = Math.floor(division) === division;
  return (isInteger ? division + 1 : Math.ceil(division)) * multiple;
}

export function getMultipleGte(value: number, multiple: number): number {
  return Math.ceil(value / multiple) * multiple;
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

export interface NormalizedValueData {
  readonly normalizedValue: number;
  readonly orderOfMagnitude: number;
  readonly multiplier: number;
}

export function getNormalizedValue(value: number): NormalizedValueData {
  const orderOfMagnitude = getOrderOfMagnitude(value);

  const multiplier = Math.pow(10, orderOfMagnitude);

  // normalizes all prices to have the significant digit at index 0
  // examples:
  // 12345 -> 1.2345
  // 0.12345 -> 1.2345
  // etc
  const normalizedValue = value / multiplier;

  return {
    normalizedValue,
    orderOfMagnitude,
    multiplier,
  };
}
