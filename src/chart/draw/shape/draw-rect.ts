import { getPixelAdjustment } from '../../helpers';
import { ShapeParametersBase } from '../types';
import { DEFAULT_THICKNESS, setShapeStyles } from '../util';

interface RectParametersSpecific {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export type RectParameters = RectParametersSpecific & ShapeParametersBase;

export function drawRect(
  c: CanvasRenderingContext2D,
  parameters: RectParameters,
): void {
  const { x, y, width, height, drawType, strokeThickness } = parameters;

  setShapeStyles(c, parameters);

  if (drawType === 'fill' || drawType === 'fill-and-stroke') {
    c.beginPath();
    c.rect(x, y, width, height);
    c.fill();
  }

  if (drawType === 'stroke' || drawType === 'fill-and-stroke') {
    const adjustment = getPixelAdjustment(strokeThickness ?? DEFAULT_THICKNESS);

    c.beginPath();
    c.rect(x + adjustment, y + adjustment, width, height);
    c.stroke();
  }
}
