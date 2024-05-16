import { getPixelAdjustment } from '../../helpers';
import { LineParametersBase } from '../types';
import { DEFAULT_THICKNESS, setLineStyles } from '../util';

interface VerticalLineParametersSpecific {
  readonly x: number;
  readonly y1: number;
  readonly y2: number;
}

export type VerticalLineParameters = VerticalLineParametersSpecific &
  LineParametersBase;

export function drawVerticalLine(
  c: CanvasRenderingContext2D,
  parameters: VerticalLineParameters,
): void {
  const { x, y1, y2, thickness } = parameters;

  setLineStyles(c, parameters);

  const adjustment = getPixelAdjustment(thickness ?? DEFAULT_THICKNESS);

  c.beginPath();
  c.moveTo(x + adjustment, y1);
  c.lineTo(x + adjustment, y2);
  c.stroke();
}
