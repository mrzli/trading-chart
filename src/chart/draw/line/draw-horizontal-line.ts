import { getPixelAdjustment } from '../../helpers';
import { LineParametersBase } from '../types';
import { DEFAULT_THICKNESS, setLineStyles } from '../util';

interface HorizontalLineParametersSpecific {
  readonly y: number;
  readonly x1: number;
  readonly x2: number;
}

export type HorizontalLineParameters = HorizontalLineParametersSpecific &
  LineParametersBase;

export function drawHorizontalLine(
  c: CanvasRenderingContext2D,
  parameters: HorizontalLineParameters,
): void {
  const { y, x1, x2, thickness } = parameters;

  setLineStyles(c, parameters);

  const adjustment = getPixelAdjustment(thickness ?? DEFAULT_THICKNESS);

  c.beginPath();
  c.moveTo(x1, y + adjustment);
  c.lineTo(x2, y + adjustment);
  c.stroke();
}
