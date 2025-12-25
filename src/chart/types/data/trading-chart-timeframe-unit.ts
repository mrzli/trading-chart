export const LIST_OF_TRADING_CHART_TIMEFRAME_UNITS = [
  's',
  'm',
  'h',
  'D',
  'W',
  'M',
  'Y',
] as const;

export type TradingChartTimeframeUnit =
  (typeof LIST_OF_TRADING_CHART_TIMEFRAME_UNITS)[number];
