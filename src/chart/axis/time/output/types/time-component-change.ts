export const LIST_OF_TIME_COMPONENT_CHANGES = [
  'year',
  'month',
  'day',
  'minute',
] as const;

export type TimeComponentChange =
  (typeof LIST_OF_TIME_COMPONENT_CHANGES)[number];
