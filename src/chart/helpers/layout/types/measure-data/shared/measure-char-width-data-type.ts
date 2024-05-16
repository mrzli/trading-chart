export const LIST_OF_MEASURE_CHAR_WIDTH_DATA_TYPES = [
  'constant',
  'variable',
] as const;

export type MeasureCharWidthDataType =
  (typeof LIST_OF_MEASURE_CHAR_WIDTH_DATA_TYPES)[number];
