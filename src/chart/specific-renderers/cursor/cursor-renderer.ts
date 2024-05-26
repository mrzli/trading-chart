import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { CanvasChartCursorState } from '../../chart';
import {
  CandleSeriesItem,
  HorizontalLineParameters,
  VerticalLineParameters,
  drawHorizontalLine,
  drawVerticalLine,
} from '../../draw';
import {
  ChartAreas,
  priceToPixel,
  seriesIndexFractionalToPixel,
} from '../../helpers';
import { Ohlc, Range, Rect, SeriesPosition } from '../../types';

export interface CursorRendererDataItem {
  readonly ohlc: Ohlc;
  readonly candle: CandleSeriesItem;
}

export interface CursorRendererData {
  readonly items: readonly CursorRendererDataItem[];
  readonly areas: ChartAreas;
  readonly priceRange: Range;
  readonly seriesPosition: SeriesPosition;
  readonly cursorState: CanvasChartCursorState | undefined;
}

export function createCursorRenderer(
  area: Rect,
): CanvasRenderer<CursorRendererData> {
  const renderer = (
    c: CanvasRenderingContext2D,
    _area: Rect | undefined,
    data: CursorRendererData,
  ): void => {
    const { areas, priceRange, seriesPosition, cursorState } = data;

    if (cursorState === undefined) {
      return;
    }

    const { main: mainArea } = areas;

    const { x, y, width, height } = mainArea;
    const { price, seriesItemIndex } = cursorState;

    const xCoord = seriesIndexFractionalToPixel(
      Math.floor(seriesItemIndex) + 0.5,
      width,
      seriesPosition,
    );
    const yCoord = priceToPixel(price, height, priceRange);

    const xLineParams: HorizontalLineParameters = {
      y: y + yCoord,
      x1: x,
      x2: x + width,
      color: 'rgba(255, 255, 255, 1.0)',
      dashPattern: [5, 5],
    };

    drawHorizontalLine(c, xLineParams);

    const yLineParams: VerticalLineParameters = {
      x: x + xCoord,
      y1: y,
      y2: y + height,
      color: 'rgba(255, 255, 255, 1.0)',
      dashPattern: [5, 5],
    };

    drawVerticalLine(c, yLineParams);
  };

  return createCanvasRenderer<CursorRendererData>(area, undefined, renderer);
}
