import { CandleSeriesOutputItem } from './candle-series-output-item';

export interface CandleSeriesOutput {
  readonly itemWidth: number;
  readonly items: readonly CandleSeriesOutputItem[];
}
