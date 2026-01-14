import { Range } from '../../../../../types';
import { Ohlc, SeriesPosition } from '../../../../types';

export interface VolumeSeriesInput {
  readonly data: readonly Ohlc[];
  readonly dataVisibleSpan: Range | undefined;
  readonly position: SeriesPosition;
  readonly xAxisLength: number;
  readonly height: number;
}
