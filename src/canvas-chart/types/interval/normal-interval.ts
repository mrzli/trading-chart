export const LIST_OF_NORMAL_INTERVAL_TIME_UNITS = ['s', 'D', 'M', 'Y'] as const;

export type NormalIntervalTimeUnit =
  (typeof LIST_OF_NORMAL_INTERVAL_TIME_UNITS)[number];

export interface NormalInterval {
  readonly unit: NormalIntervalTimeUnit;
  readonly value: number;
}
