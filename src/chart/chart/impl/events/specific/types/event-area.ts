export const LIST_OF_EVENT_AREAS = [
  'none',
  'main',
  'x-axis',
  'y-axis',
  'corner',
] as const;

export type EventArea = (typeof LIST_OF_EVENT_AREAS)[number];
