export const LIST_OF_TIME_DISPLAY_TYPES = [
  'year',
  'month',
  'day',
  'minute',
  'none',
] as const;

export type TimeDisplayType = (typeof LIST_OF_TIME_DISPLAY_TYPES)[number];
