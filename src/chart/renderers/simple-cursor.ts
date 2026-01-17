import { filterOutNullish } from '@gmjs/array-transformers';
import {
  DrawItem,
  DrawItemBatch,
  FontStyle,
  Margin,
  PathStyle,
  Point,
  Rect,
} from '../../types';
import {
  DEFAULT_THICKNESS,
  getPixelAdjustment,
  rectToClipPath,
} from '../../util';

export interface RenderSimpleCursorInput {
  readonly fullArea: Rect;
  readonly mainArea: Rect;
  readonly xAxisArea: Rect | undefined;
  readonly yAxisArea: Rect | undefined;
  readonly position: Point | undefined;
  readonly lineColor: string | undefined;
  readonly fontColor: string | undefined;
  readonly textBoxColor: string | undefined;
  readonly pathStyle: PathStyle | undefined;
  readonly fontStyle: FontStyle | undefined;
  readonly xAxisText: string | undefined;
  readonly xAxisBoxOffset: number | undefined;
  readonly xAxisBoxPadding: Margin | undefined;
  readonly yAxisText: string | undefined;
  readonly yAxisBoxOffset: number | undefined;
  readonly yAxisBoxPadding: Margin | undefined;
}

export function renderSimpleCursor(
  input: RenderSimpleCursorInput,
): readonly DrawItem[] {
  const {
    fullArea,
    mainArea,
    xAxisArea,
    yAxisArea,
    position,
    lineColor,
    fontColor,
    textBoxColor,
    pathStyle,
    fontStyle,
    xAxisText,
    xAxisBoxOffset,
    xAxisBoxPadding,
    yAxisText,
    yAxisBoxOffset,
    yAxisBoxPadding,
  } = input;

  if (position === undefined) {
    return [];
  }

  const positionInMain: Point = {
    x: mainArea.x + position.x,
    y: mainArea.y + position.y,
  };

  const cursorLinesBatch = getCursorLinesBatch(
    positionInMain,
    mainArea,
    lineColor,
    pathStyle,
  );

  const xAxisBatch =
    xAxisText === undefined || xAxisArea === undefined
      ? undefined
      : getXAxisBatch(
          positionInMain,
          xAxisArea,
          fontColor,
          textBoxColor,
          fontStyle,
          xAxisText,
          xAxisBoxOffset,
          xAxisBoxPadding,
        );

  const yAxisBatch =
    yAxisText === undefined || yAxisArea === undefined
      ? undefined
      : getYAxisBatch(
          positionInMain,
          yAxisArea,
          fontColor,
          textBoxColor,
          fontStyle,
          yAxisText,
          yAxisBoxOffset,
          yAxisBoxPadding,
        );

  const batches = filterOutNullish([cursorLinesBatch, xAxisBatch, yAxisBatch]);

  const batch: DrawItemBatch = {
    kind: 'batch',
    clipPath: rectToClipPath(fullArea),
    items: batches,
  };

  return [batch];
}

function getCursorLinesBatch(
  position: Point,
  mainArea: Rect,
  lineColor: string | undefined,
  pathStyle: PathStyle | undefined,
): DrawItemBatch {
  const thickness = pathStyle?.lineWidth ?? DEFAULT_THICKNESS;
  const adjustment = getPixelAdjustment(thickness);

  const x = position.x + adjustment;
  const y = position.y + adjustment;

  return {
    kind: 'batch',
    clipPath: rectToClipPath(mainArea),
    style: {
      fillStrokeStyle: {
        strokeStyle: lineColor,
      },
      pathStyle,
    },
    items: [
      {
        kind: 'path',
        operation: 'stroke',
        commands: [
          // vertical line
          { kind: 'move-to', x, y: mainArea.y },
          { kind: 'line-to', x, y: mainArea.y + mainArea.height },
          // horizontal line
          { kind: 'move-to', x: mainArea.x, y },
          { kind: 'line-to', x: mainArea.x + mainArea.width, y },
        ],
      },
    ],
  };
}

function getXAxisBatch(
  position: Point,
  xAxisArea: Rect,
  fontColor: string | undefined,
  textBoxColor: string | undefined,
  fontStyle: FontStyle | undefined,
  text: string,
  boxOffset: number | undefined,
  boxPadding: Margin | undefined,
): DrawItemBatch {
  const offset = boxOffset ?? 0;
  const padding = boxPadding ?? DEFAULT_PADDING;

  const y = xAxisArea.y + offset;

  return {
    kind: 'batch',
    clipPath: undefined,
    style: {
      fillStrokeStyle: {
        fillStyle: textBoxColor,
      },
      textStyle: {
        font: fontStyle,
        horizontalAlign: 'center',
        verticalAlign: 'top',
      },
    },
    items: [
      {
        kind: 'batch',
        style: {
          fillStrokeStyle: {
            fillStyle: textBoxColor,
          },
        },
        items: [
          {
            kind: 'text-box',
            text,
            x: position.x,
            y,
            operation: 'fill',
            boxPadding: padding,
          },
        ],
      },
      {
        kind: 'batch',
        style: {
          fillStrokeStyle: {
            fillStyle: fontColor,
          },
        },
        items: [
          {
            kind: 'text',
            text,
            x: position.x,
            y: y + padding.top,
          },
        ],
      },
    ],
  };
}

function getYAxisBatch(
  position: Point,
  yAxisArea: Rect,
  fontColor: string | undefined,
  textBoxColor: string | undefined,
  fontStyle: FontStyle | undefined,
  text: string,
  boxOffset: number | undefined,
  boxPadding: Margin | undefined,
): DrawItemBatch {
  const offset = boxOffset ?? 0;
  const padding = boxPadding ?? DEFAULT_PADDING;

  const x = yAxisArea.x + offset;

  return {
    kind: 'batch',
    clipPath: undefined,
    style: {
      fillStrokeStyle: {
        fillStyle: textBoxColor,
      },
      textStyle: {
        font: fontStyle,
        horizontalAlign: 'left',
        verticalAlign: 'middle',
      },
    },
    items: [
      {
        kind: 'batch',
        style: {
          fillStrokeStyle: {
            fillStyle: textBoxColor,
          },
        },
        items: [
          {
            kind: 'text-box',
            text,
            x,
            y: position.y,
            operation: 'fill',
            boxPadding: padding,
          },
        ],
      },
      {
        kind: 'batch',
        style: {
          fillStrokeStyle: {
            fillStyle: fontColor,
          },
        },
        items: [
          {
            kind: 'text',
            text,
            x: x + padding.left,
            y: position.y,
          },
        ],
      },
    ],
  };
}

const DEFAULT_X_PADDING = 5;
const DEFAULT_Y_PADDING = 2;
const DEFAULT_PADDING: Margin = {
  top: DEFAULT_Y_PADDING,
  right: DEFAULT_X_PADDING,
  bottom: DEFAULT_Y_PADDING,
  left: DEFAULT_X_PADDING,
};
