import { Rect } from "../../../types";

export interface TradingChartAreas {
  readonly entire: Rect;
  readonly all: Rect;
  readonly mains: readonly TradingChartAreaMainWithYAxis[];
  readonly xAxis: Rect;
  readonly corner: Rect;
}

export interface TradingChartAreaMainWithYAxis {
  readonly main: Rect;
  readonly yAxis: Rect;
}
