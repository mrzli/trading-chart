import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { CanvasChartCursorState } from '../../chart';
import {
  BoxedTextParameters,
  CandleSeriesItem,
  HorizontalLineParameters,
  VerticalLineParameters,
  drawBoxedText,
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
  readonly seriesPosition: SeriesPosition;
  readonly timezone: string;
  readonly priceRange: Range;
  readonly pricePrecision: number;
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
    const {
      areas,
      seriesPosition,
      timezone,
      priceRange,
      pricePrecision,
      cursorState,
    } = data;

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

    // price
    const priceLineParams: HorizontalLineParameters = {
      y: y + yCoord,
      x1: x,
      x2: x + width,
      color: COLOR,
      dashPattern: DASH_PATTERN,
    };

    drawHorizontalLine(c, priceLineParams);

    const priceTextParams: BoxedTextParameters = {
      x: x + width + 5,
      y: y + yCoord,
      color: COLOR,
      fontSize: 12,
      fontFamily: 'sans-serif',
      text: price.toFixed(pricePrecision),
      textBaseline: 'middle',
      padding: { top: 5, right: 5, bottom: 5, left: 5 },
      boxDrawType: 'fill',
      boxFillColor: 'orange',
    };

    // time
    drawBoxedText(c, priceTextParams);

    const seriesLineParams: VerticalLineParameters = {
      x: x + xCoord,
      y1: y,
      y2: y + height,
      color: COLOR,
      dashPattern: DASH_PATTERN,
    };

    drawVerticalLine(c, seriesLineParams);

    const seriesTextParams: BoxedTextParameters = {
      x: x + xCoord,
      y: y + height + 6,
      color: COLOR,
      fontSize: 12,
      fontFamily: 'sans-serif',
      text: 'series',
      textAlign: 'center',
      textBaseline: 'top',
      padding: { top: 5, right: 5, bottom: 5, left: 6 },
      boxDrawType: 'fill',
      boxFillColor: 'orange',
    };

    drawBoxedText(c, seriesTextParams);
  };

  return createCanvasRenderer<CursorRendererData>(area, undefined, renderer);
}

const COLOR = 'rgba(255, 255, 255, 1.0)';
const DASH_PATTERN: readonly number[] = [5, 5];
