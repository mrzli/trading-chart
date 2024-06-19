import { unixSecondsToDateObjectTz } from '@gmjs/date-util';
import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { CanvasChartCursorState, CanvasChartData } from '../../chart';
import {
  BoxedTextParameters,
  HorizontalLineParameters,
  VerticalLineParameters,
  drawBoxedText,
  drawHorizontalLine,
  drawVerticalLine,
} from '../../draw';
import {
  ChartAreas,
  dateObjectToWeekday,
  formatAsDate,
  formatAsHourMinute,
  formatAsWeekdayString,
  priceToPixel,
  seriesIndexFractionalToPixel,
} from '../../helpers';
import { Interval, Range, Rect, SeriesPosition } from '../../types';
import { filterOutNullish } from '@gmjs/array-transformers';

export interface CursorRendererData {
  readonly areas: ChartAreas;
  readonly chartData: CanvasChartData;
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
      chartData,
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
      text: formatPrice(price, pricePrecision),
      textBaseline: 'middle',
      padding: { top: 2, right: 5, bottom: 2, left: 5 },
      boxDrawType: 'fill',
      boxFillColor: BOX_COLOR,
    };

    drawBoxedText(c, priceTextParams);

    // time
    const seriesLineParams: VerticalLineParameters = {
      x: x + xCoord,
      y1: y,
      y2: y + height,
      color: COLOR,
      dashPattern: DASH_PATTERN,
    };

    drawVerticalLine(c, seriesLineParams);

    const seriesIntegerIndex = Math.floor(seriesItemIndex);
    const item = chartData.items[seriesIntegerIndex];

    const seriesTextParams: BoxedTextParameters = {
      x: x + xCoord,
      y: y + height + 6,
      color: COLOR,
      fontSize: 12,
      fontFamily: 'sans-serif',
      text:
        item === undefined
          ? '-'
          : formatTime(item.time, timezone, chartData.interval) +
            ' ' +
            seriesIntegerIndex,
      textAlign: 'center',
      textBaseline: 'top',
      padding: { top: 2, right: 5, bottom: 2, left: 5 },
      boxDrawType: 'fill',
      boxFillColor: BOX_COLOR,
    };

    drawBoxedText(c, seriesTextParams);
  };

  return createCanvasRenderer<CursorRendererData>(area, undefined, renderer);
}

function formatPrice(price: number, pricePrecision: number): string {
  return price.toFixed(pricePrecision);
}

function formatTime(
  time: number,
  timezone: string,
  interval: Interval,
): string {
  const { unit } = interval;

  const showTime = unit === 'h' || unit === 'm' || unit === 's';

  const dateObject = unixSecondsToDateObjectTz(time, timezone);

  const weekday = dateObjectToWeekday(dateObject);

  const timeStringComponents: readonly string[] = filterOutNullish([
    formatAsWeekdayString(weekday),
    formatAsDate(dateObject),
    showTime ? formatAsHourMinute(dateObject) : undefined,
  ]);

  const timeString = timeStringComponents.join(' ');

  return timeString;
}

const COLOR = 'rgba(255, 255, 255, 1.0)';
const BOX_COLOR = '#005F25';
const DASH_PATTERN: readonly number[] = [5, 5];
