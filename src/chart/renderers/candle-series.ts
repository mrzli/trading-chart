import { applyFn } from '@gmjs/apply-function';
import { groupBy, map, toArray } from '@gmjs/value-transformers';
import {
  DrawItem,
  DrawItemBatch,
  DrawItemPath,
  DrawPathCommand,
  Rect,
} from '../../types';
import { rectToClipPath } from '../../util';

export interface CandleSeriesRenderItem {
  readonly xCenter: number;
  readonly y1: number;
  readonly y2: number;
  readonly y3: number;
  readonly y4: number;
  readonly color: string;
}

export interface RenderCandleSeriesInput {
  readonly area: Rect;
  readonly itemWidth: number;
  readonly items: readonly CandleSeriesRenderItem[];
}

export function renderCandleSeries(
  input: RenderCandleSeriesInput,
): readonly DrawItem[] {
  const { area, itemWidth, items } = input;

  const wickThickness = DEFAULT_WICK_THICKNESS;
  const candleWidth = getCandleWidth(itemWidth, wickThickness);
  const isDegenerateCandle = candleWidth <= wickThickness;

  const batchItems: readonly DrawItemBatch[] = applyFn(
    items,
    groupBy((item) => item.color),
    map(([color, items]) =>
      getCandleDrawBatch(
        color,
        items,
        area,
        candleWidth,
        wickThickness,
        isDegenerateCandle,
      ),
    ),
    toArray(),
  );

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(area),
    items: batchItems,
  };

  return [batch];
}

const DEFAULT_WICK_THICKNESS = 1;

const CANDLE_WIDTH_FRACTION = 0.7;
const CANDLE_DEGENERATION_THRESHOLD = 3;
const DEGENERATE_CANDLE_WIDTH = 1;

function getCandleWidth(itemWidth: number, wickThickness: number): number {
  const rawCandleWidth = itemWidth * CANDLE_WIDTH_FRACTION;
  const possiblyDegenerateCandleWidth =
    rawCandleWidth >= CANDLE_DEGENERATION_THRESHOLD
      ? Math.ceil(rawCandleWidth)
      : DEGENERATE_CANDLE_WIDTH;

  return getAdjustedWidth(possiblyDegenerateCandleWidth, wickThickness);
}

function getAdjustedWidth(width: number, wickThickness: number): number {
  const floorWickTickness = Math.floor(wickThickness);
  const isWickThicknessOdd = floorWickTickness % 2 === 1;

  const floorWidth = Math.floor(width);
  const isWidthOdd = floorWidth % 2 === 1;

  return isWickThicknessOdd === isWidthOdd ? width : width + 1;
}

function getCandleDrawBatch(
  color: string,
  items: readonly CandleSeriesRenderItem[],
  area: Rect,
  candleWidth: number,
  wickThickness: number,
  isDegenerateCandle: boolean,
): DrawItemBatch {
  const path: DrawItemPath = {
    kind: 'path',
    fillStrokeType: 'fill',
    commands: items.flatMap((item) =>
      getCandleDrawCommands(
        item,
        area,
        candleWidth,
        wickThickness,
        isDegenerateCandle,
      ),
    ),
  };

  return {
    kind: 'batch',
    clipPath: undefined,
    style: {
      fillStrokeStyle: {
        fillStyle: color,
      },
    },
    items: [path],
  };
}

function getCandleDrawCommands(
  item: CandleSeriesRenderItem,
  area: Rect,
  candleWidth: number,
  wickThickness: number,
  isDegenerateCandle: boolean,
): readonly DrawPathCommand[] {
  return isDegenerateCandle
    ? getDenegerateCandleDrawCommands(item, area, candleWidth)
    : getRegularCandleDrawCommands(item, area, candleWidth, wickThickness);
}

function getDenegerateCandleDrawCommands(
  item: CandleSeriesRenderItem,
  area: Rect,
  candleWidth: number,
): readonly DrawPathCommand[] {
  const { xCenter: rawXCenter, y1: rawY1, y4: unadjustedY4 } = item;

  const rawY4 = unadjustedY4 - rawY1 < 1 ? unadjustedY4 + 1 : unadjustedY4;

  const xCenter = area.x + rawXCenter;
  const y1 = area.y + rawY1;
  const y4 = area.y + rawY4;

  const xBody = xCenter - Math.floor(candleWidth / 2);

  return [
    { kind: 'move-to', x: xBody, y: y1 },
    { kind: 'line-to', x: xBody, y: y4 },
    { kind: 'line-to', x: xBody + candleWidth, y: y4 },
    { kind: 'line-to', x: xBody + candleWidth, y: y1 },
    { kind: 'line-to', x: xBody, y: y1 },
  ];
}

function getRegularCandleDrawCommands(
  item: CandleSeriesRenderItem,
  area: Rect,
  candleWidth: number,
  wickThickness: number,
): readonly DrawPathCommand[] {
  const {
    xCenter: rawXCenter,
    y1: rawY1,
    y2: rawY2,
    y3: unadjustedY3,
    y4: unadjustedY4,
  } = item;

  const rawY3 = unadjustedY3 - rawY2 < 1 ? unadjustedY3 + 1 : unadjustedY3;
  const rawY4 = Math.max(unadjustedY4, rawY3);

  const xCenter = area.x + rawXCenter;
  const y1 = area.y + rawY1;
  const y2 = area.y + rawY2;
  const y3 = area.y + rawY3;
  const y4 = area.y + rawY4;

  const xWick = xCenter - Math.floor(wickThickness / 2);
  const xBody = xCenter - Math.floor(candleWidth / 2);

  return [
    { kind: 'move-to', x: xWick, y: y1 },
    { kind: 'line-to', x: xWick, y: y2 },
    { kind: 'line-to', x: xBody, y: y2 },
    { kind: 'line-to', x: xBody, y: y3 },
    { kind: 'line-to', x: xWick, y: y3 },
    { kind: 'line-to', x: xWick, y: y4 },
    { kind: 'line-to', x: xWick + wickThickness, y: y4 },
    { kind: 'line-to', x: xWick + wickThickness, y: y3 },
    { kind: 'line-to', x: xBody + candleWidth, y: y3 },
    { kind: 'line-to', x: xBody + candleWidth, y: y2 },
    { kind: 'line-to', x: xWick + wickThickness, y: y2 },
    { kind: 'line-to', x: xWick + wickThickness, y: y1 },
    { kind: 'line-to', x: xWick, y: y1 },
  ];
}
