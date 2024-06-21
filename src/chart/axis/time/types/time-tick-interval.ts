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

export const LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES = [
  1, 2, 3, 5, 10, 15, 30,
] as const;

export type TimeTickIntervalMinuteValue =
  (typeof LIST_OF_TIME_TICK_INTERVAL_MINUTE_VALUES)[number];

export interface TimeTickIntervalMinute extends TimeTickIntervalBase {
  readonly unit: 'm';
  readonly value: TimeTickIntervalMinuteValue;
}

export const LIST_OF_TIME_TICK_INTERVAL_HOUR_VALUES = [
  1, 2, 3, 4, 6, 8, 12,
] as const;

export type TimeTickIntervalHourValue =
  (typeof LIST_OF_TIME_TICK_INTERVAL_HOUR_VALUES)[number];

export interface TimeTickIntervalHour extends TimeTickIntervalBase {
  readonly unit: 'h';
  readonly value: TimeTickIntervalHourValue;
}

export const LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES = [1, 7, 14] as const;

export type TimeTickIntervalDayValue =
  (typeof LIST_OF_TIME_TICK_INTERVAL_DAY_VALUES)[number];

export interface TimeTickIntervalDay extends TimeTickIntervalBase {
  readonly unit: 'D';
  readonly value: TimeTickIntervalDayValue;
}

export const LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES = [1, 3, 6] as const;

export type TimeTickIntervalMonthValue =
  (typeof LIST_OF_TIME_TICK_INTERVAL_MONTH_VALUES)[number];

export interface TimeTickIntervalMonth extends TimeTickIntervalBase {
  readonly unit: 'M';
  readonly value: TimeTickIntervalMonthValue;
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

export type TimeTickIntervalFromTimeUnit<
  TUnit extends TimeTickIntervalTimeUnit,
> = Extract<TimeTickInterval, { readonly unit: TUnit }>;

export type TimeTickIntervalUnit<TUnit extends TimeTickIntervalTimeUnit> =
  TimeTickIntervalFromTimeUnit<TUnit>['unit'];

export type TimeTickIntervalValue<TUnit extends TimeTickIntervalTimeUnit> =
  TimeTickIntervalFromTimeUnit<TUnit>['value'];
