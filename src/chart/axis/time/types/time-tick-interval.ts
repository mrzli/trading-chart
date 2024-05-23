export const LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS = [
  'm',
  'h',
  'D',
  'M',
  'Y',
] as const;

export type TimeTickIntervalTimeUnit =
  (typeof LIST_OF_TIME_TICK_INTERVAL_TIME_UNITS)[number];

export interface TimeTickIntervalBase {
  readonly unit: TimeTickIntervalTimeUnit;
  readonly value: number;
}

export interface TimeTickIntervalMinute extends TimeTickIntervalBase {
  readonly unit: 'm';
  readonly value: 1 | 2 | 3 | 5 | 10 | 15 | 30;
}

export interface TimeTickIntervalHour extends TimeTickIntervalBase {
  readonly unit: 'h';
  readonly value: 1 | 2 | 3 | 4 | 6 | 8 | 12;
}

export interface TimeTickIntervalDay extends TimeTickIntervalBase {
  readonly unit: 'D';
  readonly value: 1 | 2 | 3 | 7 | 14;
}

export interface TimeTickIntervalMonth extends TimeTickIntervalBase {
  readonly unit: 'M';
  readonly value: 1 | 3 | 6;
}

export interface TimeTickIntervalYear extends TimeTickIntervalBase {
  readonly unit: 'Y';
  readonly value: number;
}

export type TimeTickInterval =
  | TimeTickIntervalMinute
  | TimeTickIntervalHour
  | TimeTickIntervalDay
  | TimeTickIntervalMonth
  | TimeTickIntervalYear;
