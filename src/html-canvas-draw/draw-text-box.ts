import { DrawItemTextBox, DrawItemPath, Margin } from '../types';
import { drawPath } from './draw-path';

export function drawTextBox(
  c: CanvasRenderingContext2D,
  t: DrawItemTextBox,
): void {
  const { text, x, y, operation, boxPadding } = t;

  const tm = c.measureText(text);

  const padding: Margin = boxPadding ?? ZERO_PADDING;

  const textOffsetX = getTextOffsetX(c.textAlign, padding);
  const textOffsetY = getTextOffsetY(c.textBaseline, padding);

  const textX = x + textOffsetX;
  const textY = y + textOffsetY;

  const nonPaddedX1 = textX - tm.actualBoundingBoxLeft;
  const nonPaddedY1 = textY - tm.fontBoundingBoxAscent;
  const nonPaddedX2 = textX + tm.actualBoundingBoxRight;
  const nonPaddedY2 = textY + tm.fontBoundingBoxDescent;

  const xRect = nonPaddedX1 - padding.left;
  const yRect = nonPaddedY1 - padding.top;
  const width = nonPaddedX2 - nonPaddedX1 + padding.left + padding.right;
  const height = nonPaddedY2 - nonPaddedY1 + padding.top + padding.bottom;

  const boxPath: DrawItemPath = {
    kind: 'path',
    operation,
    commands: [{ kind: 'rect', x: xRect, y: yRect, width, height }],
  };

  drawPath(c, boxPath);
}

function getTextOffsetX(
  horizontalAlign: CanvasTextAlign,
  padding: Margin,
): number {
  switch (horizontalAlign) {
    case 'left':
    case 'start': {
      return padding.left;
    }
    case 'right':
    case 'end': {
      return -padding.right;
    }
    default: {
      return 0;
    }
  }
}

function getTextOffsetY(
  verticalAlign: CanvasTextBaseline,
  padding: Margin,
): number {
  switch (verticalAlign) {
    case 'top': {
      return padding.top;
    }
    case 'bottom': {
      return -padding.bottom;
    }
    default: {
      return 0;
    }
  }
}

const ZERO_PADDING: Margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
