export const LIST_OF_TICK_INTERVAL_TIME_UNITS = [
  's',
  'm',
  'h',
  'D',
  'M',
  'Y',
] as const;

export type TickIntervalTimeUnit =
  (typeof LIST_OF_TICK_INTERVAL_TIME_UNITS)[number];

export interface TickIntervalBase {
  readonly unit: TickIntervalTimeUnit;
  readonly value: number;
}

export interface TickIntervalSecond extends TickIntervalBase {
  readonly unit: 's';
  readonly value: 1;
}

export interface TickIntervalMinute extends TickIntervalBase {
  readonly unit: 'm';
  readonly value: 1 | 2 | 3 | 5 | 10 | 15 | 30;
}

export interface TickIntervalHour extends TickIntervalBase {
  readonly unit: 'h';
  readonly value: 1 | 2 | 3 | 4 | 6 | 8 | 12;
}

export interface TickIntervalDay extends TickIntervalBase {
  readonly unit: 'D';
  readonly value: 1 | 2 | 3 | 7 | 14;
}

export interface TickIntervalMonth extends TickIntervalBase {
  readonly unit: 'M';
  readonly value: 1 | 3 | 6;
}

export interface TickIntervalYear extends TickIntervalBase {
  readonly unit: 'Y';
  readonly value: number;
}

export type TickInterval =
  | TickIntervalSecond
  | TickIntervalMinute
  | TickIntervalHour
  | TickIntervalDay
  | TickIntervalMonth
  | TickIntervalYear;
