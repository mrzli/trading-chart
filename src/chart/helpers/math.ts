export function getNumIntegerDigits(value: number): number {
  const log = Math.log10(Math.abs(value));
  return Math.max(Math.floor(log), 0) + 1;
}

export function getSignificantDigitIndex(value: number): number {
  const v = Math.abs(value);
  return Math.floor(Math.log10(v));
}

export function getOrderOfMagnitude(value: number): number {
  const significantDigitIndex = getSignificantDigitIndex(value);
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
