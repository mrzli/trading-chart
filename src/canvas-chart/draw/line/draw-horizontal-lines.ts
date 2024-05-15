import { getPixelAdjustment } from '../../helpers';
import { LineParametersBase } from '../types';
import { DEFAULT_THICKNESS, setLineStyles } from '../util';

interface HorizontalLinesParametersSpecific {
  readonly yArray: readonly number[];
  readonly x1: number;
  readonly x2: number;
}

export type HorizontalLinesParameters = HorizontalLinesParametersSpecific &
  LineParametersBase;

export function drawHorizontalLines(
  c: CanvasRenderingContext2D,
  parameters: HorizontalLinesParameters,
): void {
  const { yArray, x1, x2, thickness } = parameters;

  setLineStyles(c, parameters);

  const adjustment = getPixelAdjustment(thickness ?? DEFAULT_THICKNESS);

  c.beginPath();
  for (const y of yArray) {
    c.moveTo(x1, y + adjustment);
    c.lineTo(x2, y + adjustment);
  }
  c.stroke();
}
