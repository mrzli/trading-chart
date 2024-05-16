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

export interface IntervalBase {
  readonly unit: IntervalTimeUnit;
  readonly value: number;
}

export interface IntervalSecond extends IntervalBase {
  readonly unit: 's';
  readonly value: 1 | 5 | 10 | 15 | 30;
}

export interface IntervalMinute extends IntervalBase {
  readonly unit: 'm';
  readonly value: 1 | 5 | 10 | 15 | 30;
}

export interface IntervalHour extends IntervalBase {
  readonly unit: 'h';
  readonly value: 1 | 4;
}

export interface IntervalDay extends IntervalBase {
  readonly unit: 'D';
  readonly value: 1;
}

export interface IntervalWeek extends IntervalBase {
  readonly unit: 'W';
  readonly value: 1;
}

export interface IntervalMonth extends IntervalBase {
  readonly unit: 'M';
  readonly value: 1 | 3 | 6;
}

export interface IntervalYear extends IntervalBase {
  readonly unit: 'Y';
  readonly value: 1;
}

export type Old =
  | IntervalSecond
  | IntervalMinute
  | IntervalHour
  | IntervalDay
  | IntervalWeek
  | IntervalMonth
  | IntervalYear;
