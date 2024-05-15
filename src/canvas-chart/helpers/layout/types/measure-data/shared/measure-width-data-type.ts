export const LIST_OF_MEASURE_WIDTH_DATA_TYPES = [
  'proportional',
  'monospaced',
] as const;

export type MeasureWidthDataType =
  (typeof LIST_OF_MEASURE_WIDTH_DATA_TYPES)[number];
