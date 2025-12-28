import { Range } from '../../../../../types';
import { Ohlc, SeriesPosition } from '../../../../types';

export interface CandleSeriesInput {
  readonly data: readonly Ohlc[];
  readonly dataDisplayRange: Range | undefined;
  readonly position: SeriesPosition;
  readonly xAxisLength: number;
  readonly priceRange: Range;
  readonly yAxisLength: number;
}
