import { CandleSeriesOutputItemType } from './candle-series-output-item-type';

export interface CandleSeriesOutputItem {
  readonly x: number;
  readonly y1: number;
  readonly y2: number;
  readonly y3: number;
  readonly y4: number;
  readonly type: CandleSeriesOutputItemType;
}
