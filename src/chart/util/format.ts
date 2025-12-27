import { getOrderOfMagnitude } from './math';

export function formatNumber(value: number, precision: number): string {
  return value.toFixed(precision);
}

export function formatVolume(value: number): string {
  if (value < 1000) {
    return value.toString();
  }

  const digitIndex = getOrderOfMagnitude(value);
  const suffixIndex = Math.min(
    Math.floor((digitIndex - 3) / 3),
    LIST_OF_SUFFIXES.length - 1,
  );

  const divider = Math.pow(10, suffixIndex * 3 + 3);

  const significand = value / divider;

  return `${significand.toFixed(3)}${LIST_OF_SUFFIXES[suffixIndex]}`;
}

const LIST_OF_SUFFIXES = ['K', 'M', 'B', 'T'] as const;
