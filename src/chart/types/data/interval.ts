export const LIST_OF_INTERVAL_TIME_UNITS = [
  's',
  'm',
  'h',
  'D',
  'W',
  'M',
  'Y',
] as const;

export type IntervalTimeUnit = (typeof LIST_OF_INTERVAL_TIME_UNITS)[number];

export interface Interval {
  readonly unit: IntervalTimeUnit;
  readonly value: number;
}
