import { CandleParameters, drawCandle } from '../chart-primitives';
import { Rect } from '../../types';

export interface CandleSeriesData {
  readonly itemWidth: number;
  readonly items: readonly CandleSeriesItem[];
}

export interface CandleSeriesItem {
  readonly time: number;
  readonly x: number;
  readonly y1: number;
  readonly y2: number;
  readonly y3: number;
  readonly y4: number;
  readonly color: string;
}

export function drawCandleSeries(
  c: CanvasRenderingContext2D,
  area: Rect,
  data: CandleSeriesData,
): void {
  const { x: xArea, y: yArea, width, height } = area;
  const { itemWidth, items } = data;

  const unadjustedCandleWidth = itemWidth * CANDLE_WIDTH_FRACTION;
  const candleWidth =
    unadjustedCandleWidth >= CANDLE_DEGENERATION_THREASHOLD
      ? Math.ceil(unadjustedCandleWidth)
      : DEGENERATE_CANDLE_WIDTH;

  c.save();

  c.beginPath();
  c.rect(xArea, yArea, width, height);
  c.clip();

  const finalXOffset = xArea;
  const finalYOffset = yArea;

  for (const item of items) {
    const { x, y1, y2, y3, y4, color } = item;

    const candleParams: CandleParameters = {
      x: finalXOffset + x,
      y1: finalYOffset + y1,
      y2: finalYOffset + y2,
      y3: finalYOffset + y3,
      y4: finalYOffset + y4,
      width: candleWidth,
      color,
    };

    drawCandle(c, candleParams);
  }

  c.restore();
}

const CANDLE_WIDTH_FRACTION = 0.7;
const CANDLE_DEGENERATION_THREASHOLD = 3;
const DEGENERATE_CANDLE_WIDTH = 1;
