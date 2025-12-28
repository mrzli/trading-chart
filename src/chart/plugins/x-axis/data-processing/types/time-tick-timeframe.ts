export const LIST_OF_TIME_TICK_TIMEFRAME_UNITS = [
  'm',
  'h',
  'D',
  'M',
  'Y',
] as const;

export type TimeTickTimeframeUnit =
  (typeof LIST_OF_TIME_TICK_TIMEFRAME_UNITS)[number];

export interface TimeTickTimeframeBase {
  readonly unit: TimeTickTimeframeUnit;
  readonly value: number;
}

export const LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES = [
  1, 2, 3, 5, 10, 15, 30,
] as const;

export type TimeTickTimeframeMinuteValue =
  (typeof LIST_OF_TIME_TICK_TIMEFRAME_MINUTE_VALUES)[number];

export interface TimeTickTimeframeMinute extends TimeTickTimeframeBase {
  readonly unit: 'm';
  readonly value: TimeTickTimeframeMinuteValue;
}

export const LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES = [
  1, 2, 3, 4, 6, 8, 12,
] as const;

export type TimeTickTimeframeHourValue =
  (typeof LIST_OF_TIME_TICK_TIMEFRAME_HOUR_VALUES)[number];

export interface TimeTickTimeframeHour extends TimeTickTimeframeBase {
  readonly unit: 'h';
  readonly value: TimeTickTimeframeHourValue;
}

export const LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES = [1, 7, 14] as const;

export type TimeTickTimeframeDayValue =
  (typeof LIST_OF_TIME_TICK_TIMEFRAME_DAY_VALUES)[number];

export interface TimeTickTimeframeDay extends TimeTickTimeframeBase {
  readonly unit: 'D';
  readonly value: TimeTickTimeframeDayValue;
}

export const LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES = [1, 3, 6] as const;

export type TimeTickTimeframeMonthValue =
  (typeof LIST_OF_TIME_TICK_TIMEFRAME_MONTH_VALUES)[number];

export interface TimeTickTimeframeMonth extends TimeTickTimeframeBase {
  readonly unit: 'M';
  readonly value: TimeTickTimeframeMonthValue;
}

export interface TimeTickTimeframeYear extends TimeTickTimeframeBase {
  readonly unit: 'Y';
  readonly value: number;
}

export type TimeTickTimeframe =
  | TimeTickTimeframeMinute
  | TimeTickTimeframeHour
  | TimeTickTimeframeDay
  | TimeTickTimeframeMonth
  | TimeTickTimeframeYear;

export type TimeTickTimeframeFromUnit<TUnit extends TimeTickTimeframeUnit> =
  Extract<TimeTickTimeframe, { readonly unit: TUnit }>;

export type TimeTickTimeframeValue<TUnit extends TimeTickTimeframeUnit> =
  TimeTickTimeframeFromUnit<TUnit>['value'];
