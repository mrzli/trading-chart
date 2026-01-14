import { VolumeSeriesOutputItemType } from './volume-series-output-item-type';

export interface VolumeSeriesOutputItem {
  readonly x: number;
  readonly y1: number;
  readonly y2: number;
  readonly type: VolumeSeriesOutputItemType;
}
