export const LIS_OF_VOLUME_SERIES_OUTPUT_ITEM_TYPES = ['bull', 'bear'] as const;

export type VolumeSeriesOutputItemType =
  (typeof LIS_OF_VOLUME_SERIES_OUTPUT_ITEM_TYPES)[number];