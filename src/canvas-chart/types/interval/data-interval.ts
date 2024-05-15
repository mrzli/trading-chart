export const LIST_OF_DATA_INTERVAL_TIME_UNITS = ['m', 'h', 'D'] as const;

export type DataIntervalTimeUnit =
  (typeof LIST_OF_DATA_INTERVAL_TIME_UNITS)[number];

export interface DataIntervalBase {
  readonly unit: DataIntervalTimeUnit;
  readonly value: number;
}

export interface DataIntervalMinute extends DataIntervalBase {
  readonly unit: 'm';
  readonly value: 1 | 5 | 15 | 30;
}

export interface DataIntervalHour extends DataIntervalBase {
  readonly unit: 'h';
  readonly value: 1;
}

export interface DataIntervalDay extends DataIntervalBase {
  readonly unit: 'D';
  readonly value: 1;
}

export type DataInterval =
  | DataIntervalMinute
  | DataIntervalHour
  | DataIntervalDay;
