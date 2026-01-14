import { VolumeSeriesOutputItem } from './volume-series-output-item';

export interface VolumeSeriesOutput {
  readonly itemWidth: number;
  readonly items: readonly VolumeSeriesOutputItem[];
}
