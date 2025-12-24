import { ensureNever } from '@gmjs/assert';
import { filterOutNullish } from '@gmjs/array-transformers';
import {
  DrawItemBatch,
  DrawStyle,
  FillStrokeStyle,
  FontStyle,
  PathStyle,
  TextAlignVertical,
  TextStyle,
} from '../types';
import { drawPath, executeDrawPathCommands } from './draw-path';
import { drawText } from './draw-text';
import { drawTextBox } from './draw-text-box';
import { drawClear } from './draw-clear';

export function drawBatch(
  c: CanvasRenderingContext2D,
  batch: DrawItemBatch,
): void {
  const { clipPath, style, items } = batch;

  if (items.length === 0) {
    return;
  }

  const hasStateChanges = clipPath !== undefined || style !== undefined;

  if (hasStateChanges) {
    c.save();
  }

  if (clipPath !== undefined) {
    executeDrawPathCommands(c, clipPath);
    c.clip();
  }

  if (style !== undefined) {
    setDrawStyle(c, style);
  }

  for (const item of items) {
    switch (item.kind) {
      case 'batch': {
        drawBatch(c, item);
        break;
      }
      case 'clear': {
        drawClear(c, item);
        break;
      }
      case 'path': {
        drawPath(c, item);
        break;
      }
      case 'text': {
        drawText(c, item);
        break;
      }
      case 'text-box': {
        drawTextBox(c, item);
        break;
      }
      default: {
        return ensureNever(item);
      }
    }
  }

  if (hasStateChanges) {
    c.restore();
  }
}

function setDrawStyle(
  c: CanvasRenderingContext2D,
  s: DrawStyle | undefined,
): void {
  if (s === undefined) {
    return;
  }

  const { fillStrokeStyle, pathStyle, textStyle } = s;

  setFillStrokeStyle(c, fillStrokeStyle);
  setPathStyle(c, pathStyle);
  setTextStyle(c, textStyle);
}

function setFillStrokeStyle(
  c: CanvasRenderingContext2D,
  s: FillStrokeStyle | undefined,
): void {
  if (s === undefined) {
    return;
  }

  const { fillStyle, strokeStyle } = s;

  if (fillStyle !== undefined && c.fillStyle !== fillStyle) {
    c.fillStyle = fillStyle;
  }
  if (strokeStyle !== undefined && c.strokeStyle !== strokeStyle) {
    c.strokeStyle = strokeStyle;
  }
}

function setPathStyle(
  c: CanvasRenderingContext2D,
  s: PathStyle | undefined,
): void {
  if (s === undefined) {
    return;
  }

  const { lineWidth, lineCap, lineJoin, miterLimit, lineDash, lineDashOffset } =
    s;

  if (lineWidth !== undefined && c.lineWidth !== lineWidth) {
    c.lineWidth = lineWidth;
  }
  if (lineCap !== undefined && c.lineCap !== lineCap) {
    c.lineCap = lineCap;
  }
  if (lineJoin !== undefined && c.lineJoin !== lineJoin) {
    c.lineJoin = lineJoin;
  }
  if (miterLimit !== undefined && c.miterLimit !== miterLimit) {
    c.miterLimit = miterLimit;
  }
  if (lineDash !== undefined && isLineDashChanged(c, lineDash)) {
    c.setLineDash(lineDash);
  }
  if (lineDashOffset !== undefined && c.lineDashOffset !== lineDashOffset) {
    c.lineDashOffset = lineDashOffset;
  }
}

function isLineDashChanged(
  c: CanvasRenderingContext2D,
  lineDash: readonly number[],
): boolean {
  const currentLineDash = c.getLineDash();
  if (currentLineDash.length !== lineDash.length) {
    return true;
  }

  for (const [i, element] of lineDash.entries()) {
    if (currentLineDash[i] !== element) {
      return true;
    }
  }

  return false;
}

function setTextStyle(
  c: CanvasRenderingContext2D,
  s: TextStyle | undefined,
): void {
  if (s === undefined) {
    return;
  }

  const { font, horizontalAlign, verticalAlign } = s;
  const fontString = getFontString(font);

  if (fontString !== undefined && c.font !== fontString) {
    c.font = fontString;
  }

  if (horizontalAlign !== undefined && c.textAlign !== horizontalAlign) {
    c.textAlign = horizontalAlign;
  }

  const baseline =
    verticalAlign === undefined
      ? undefined
      : verticalAlignToBaseline(verticalAlign);
  if (baseline !== undefined && c.textBaseline !== baseline) {
    c.textBaseline = baseline;
  }
}

function getFontString(font: FontStyle | undefined): string | undefined {
  if (font === undefined) {
    return undefined;
  }

  const { family, size, weight } = font;

  if (family === undefined || size === undefined) {
    return undefined;
  }

  const parts = filterOutNullish([
    weight?.toString(),
    `${size ?? 16}px`,
    family,
  ]);

  return parts.join(' ');
}

function verticalAlignToBaseline(
  verticalAlign: TextAlignVertical,
): CanvasTextBaseline {
  switch (verticalAlign) {
    case 'top':
    case 'middle':
    case 'bottom': {
      return verticalAlign;
    }
    case 'baseline': {
      return 'alphabetic';
    }
    default: {
      return ensureNever(verticalAlign);
    }
  }
}
