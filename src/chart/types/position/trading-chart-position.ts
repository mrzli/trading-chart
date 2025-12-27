import { Range } from '../../../types';
import { SeriesPosition } from './series-position';

export interface TradingChartPosition {
  readonly seriesPosition: SeriesPosition;
  readonly range: Range;
}
