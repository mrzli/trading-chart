export function getNumIntegerDigits(value: number): number {
  const log = Math.log10(Math.abs(value));
  return Math.max(Math.floor(log), 0) + 1;
}

export function getSignificantDigitIndex(value: number): number {
  const v = Math.abs(value);
  return Math.floor(Math.log10(v));
}
