export const LIST_OF_CHART_TIMEFRAME_UNITS = [
  's',
  'm',
  'h',
  'D',
  'W',
  'M',
  'Y',
] as const;

export type ChartTimeframeUnit = (typeof LIST_OF_CHART_TIMEFRAME_UNITS)[number];
