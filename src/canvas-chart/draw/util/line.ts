import { LineParametersBase } from '../types';
import { DEFAULT_COLOR, DEFAULT_THICKNESS } from './constants';

export function setLineStyles(
  c: CanvasRenderingContext2D,
  params: LineParametersBase,
): void {
  const { color, thickness, dashPattern, dashOffset } = params;

  c.lineWidth = thickness ?? DEFAULT_THICKNESS;
  c.strokeStyle = color ?? DEFAULT_COLOR;
  if (dashPattern) {
    c.setLineDash(dashPattern);
  }
  if (dashOffset) {
    c.lineDashOffset = dashOffset;
  }
}
