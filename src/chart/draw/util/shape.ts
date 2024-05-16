import { ShapeParametersBase } from '../types';
import { DEFAULT_COLOR, DEFAULT_THICKNESS } from './constants';

export function setShapeStyles(
  c: CanvasRenderingContext2D,
  params: ShapeParametersBase,
): void {
  const {
    drawType,
    strokeColor,
    strokeThickness,
    strokeDashPattern,
    strokeDashOffset,
    fillColor,
  } = params;

  if (drawType === 'stroke' || drawType === 'fill-and-stroke') {
    c.lineWidth = strokeThickness ?? DEFAULT_THICKNESS;
    c.strokeStyle = strokeColor ?? DEFAULT_COLOR;
    if (strokeDashPattern) {
      c.setLineDash(strokeDashPattern);
    }
    if (strokeDashOffset) {
      c.lineDashOffset = strokeDashOffset;
    }
  }
  if (drawType === 'fill' || drawType === 'fill-and-stroke') {
    c.fillStyle = fillColor ?? DEFAULT_COLOR;
  }
}
