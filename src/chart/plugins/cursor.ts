import { filterOutNullish } from '@gmjs/array-transformers';
import { unixSecondsToDateObjectTz } from '@gmjs/date-util';
import { Rect, Point, Range } from '../../types';
import { renderSimpleCursor, RenderSimpleCursorInput } from '../renderers';
import {
  Ohlc,
  SeriesPosition,
  TradingChartCursorPosition,
  TradingChartPlugin,
  TradingChartTimeframe,
} from '../types';
import {
  seriesIndexFractionalToPixel,
  dateObjectToWeekday,
  formatAsWeekdayString,
  formatAsDate,
  formatAsHourMinute,
  numericValueToPixel,
} from '../util';

export interface PluginCursorOptions {
  readonly name: string;
  readonly priority: number;
}

export function pluginCursor(options: PluginCursorOptions): TradingChartPlugin {
  const { name, priority } = options;

  return {
    name,
    priority,
    execute: ({ chartInput, areas, batch, context }) => {
      const {
        theme,
        segments: segmentInputs,
        data,
        timezone,
        timeframe,
        position,
      } = chartInput;
      const { all, segments, xAxis } = areas;
      const { textColor, textBoxColor } = theme;

      const segmentIndex = 0;

      const segmentInput = segmentInputs[segmentIndex];
      const { range } = segmentInput;

      const segment = segments[segmentIndex];
      const { main, yAxis } = segment;

      const cursorPosition: TradingChartCursorPosition | undefined = {
        seriesItemIndex: 0,
        value: 10,
      };

      const cursorPixelPosition = getCursorPixelPosition(
        cursorPosition,
        main,
        position,
        range,
      );

      const xAxisText =
        cursorPosition !== undefined
          ? formatTime(
              getTime(data, cursorPosition.seriesItemIndex),
              timezone,
              timeframe,
              cursorPosition.seriesItemIndex,
            )
          : undefined;

      const yAxisText = formatPrice(cursorPosition?.value ?? 0, 1);

      const renderInput: RenderSimpleCursorInput = {
        fullArea: all,
        mainArea: main,
        xAxisArea: xAxis,
        yAxisArea: yAxis,
        position: cursorPixelPosition,
        lineColor: textColor,
        fontColor: textColor,
        textBoxColor,
        pathStyle: { lineDash: [5, 5] },
        fontStyle: { size: 12, family: 'sans-serif' },
        xAxisText,
        xAxisBoxOffset: 2,
        xAxisBoxPadding: { top: 4, right: 5, bottom: 2, left: 5 },
        yAxisText,
        yAxisBoxOffset: 0,
        yAxisBoxPadding: { top: 3, right: 5, bottom: 2, left: 5 },
      };

      const newBatch = renderSimpleCursor(renderInput);

      return {
        batch: [...batch, ...newBatch],
        context: context,
      };
    },
  };
}

function getCursorPixelPosition(
  cursorPosition: TradingChartCursorPosition | undefined,
  area: Rect,
  seriesPosition: SeriesPosition,
  range: Range,
): Point | undefined {
  if (cursorPosition === undefined) {
    return undefined;
  }

  const { seriesItemIndex, value } = cursorPosition;
  const { width, height } = area;

  const x = seriesIndexFractionalToPixel(
    Math.floor(seriesItemIndex) + 0.5,
    width,
    seriesPosition,
  );
  const y = numericValueToPixel(value, height, range);

  return { x, y };
}

function formatPrice(price: number, pricePrecision: number): string {
  return price.toFixed(pricePrecision);
}

function getTime(data: readonly Ohlc[], fractionalIndex: number): number {
  const index = Math.floor(fractionalIndex);

  if (index >= 0 && index < data.length) {
    return data[index].time;
  }

  return 0;
}

function formatTime(
  time: number,
  timezone: string,
  timeframe: TradingChartTimeframe,
  index: number,
): string {
  const { unit } = timeframe;

  const showTime = unit === 'h' || unit === 'm' || unit === 's';

  const dateObject = unixSecondsToDateObjectTz(time, timezone);

  const weekday = dateObjectToWeekday(dateObject);

  const roundedIndex = Math.round(index);

  const timeStringComponents: readonly string[] = filterOutNullish([
    formatAsWeekdayString(weekday),
    formatAsDate(dateObject),
    showTime ? formatAsHourMinute(dateObject) : undefined,
    `[${roundedIndex.toLocaleString('en-US')}]`,
  ]);

  const timeString = timeStringComponents.join(' ');

  return timeString;
}
