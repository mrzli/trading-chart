import { Ohlc, SeriesPosition } from "../../../types";

export interface TimeAxisInput {
  readonly position: SeriesPosition;
  readonly axisLength: number;
  readonly data: readonly Ohlc[];
}
