export const LIS_OF_CANDLE_SERIES_OUTPUT_ITEM_TYPES = ['bull', 'bear'] as const;

export type CandleSeriesOutputItemType =
  (typeof LIS_OF_CANDLE_SERIES_OUTPUT_ITEM_TYPES)[number];
