import { ChartTimeframeUnit } from './chart-timeframe-unit';

export interface ChartTimeframe {
  readonly unit: ChartTimeframeUnit;
  readonly value: number;
}
