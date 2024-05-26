import { Margin } from '../../types';
import { RectParameters, drawRect } from '../shape';
import { TextParameters, drawText, setTextStyle } from '../text';
import { ShapeDrawType } from '../types';

export interface BoxedTextParametersBox {
  readonly padding?: Margin;
  readonly boxDrawType: ShapeDrawType;
  readonly boxStrokeColor?: string;
  readonly boxStrokeThickness?: number;
  readonly boxStrokeDashPattern?: readonly number[];
  readonly boxStrokeDashOffset?: number;
  readonly boxFillColor?: string;
}

export type BoxedTextParameters = TextParameters & BoxedTextParametersBox;

export function drawBoxedText(
  c: CanvasRenderingContext2D,
  parameters: BoxedTextParameters,
): void {
  const {
    x,
    y,
    text,
    padding: unadjustedPadding,
    boxDrawType,
    boxStrokeColor,
    boxStrokeThickness,
    boxStrokeDashPattern,
    boxStrokeDashOffset,
    boxFillColor,
  } = parameters;

  setTextStyle(c, parameters);
  const tm = c.measureText(text);

  const nonPaddedX1 = x - tm.actualBoundingBoxLeft;
  const nonPaddedY1 = y - tm.fontBoundingBoxAscent;
  const nonPaddedX2 = x + tm.actualBoundingBoxRight;
  const nonPaddedY2 = y + tm.fontBoundingBoxDescent;

  const padding: Margin = unadjustedPadding ?? ZERO_PADDING;

  const xRect = nonPaddedX1 - padding.left;
  const yRect = nonPaddedY1 - padding.top;
  const width = nonPaddedX2 - nonPaddedX1 + padding.left + padding.right;
  const height = nonPaddedY2 - nonPaddedY1 + padding.top + padding.bottom;

  const rectParams: RectParameters = {
    x: xRect,
    y: yRect,
    width,
    height,
    drawType: boxDrawType,
    strokeColor: boxStrokeColor,
    strokeThickness: boxStrokeThickness,
    strokeDashPattern: boxStrokeDashPattern,
    strokeDashOffset: boxStrokeDashOffset,
    fillColor: boxFillColor,
  };

  drawRect(c, rectParams);
  drawText(c, parameters);
}

const ZERO_PADDING: Margin = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
