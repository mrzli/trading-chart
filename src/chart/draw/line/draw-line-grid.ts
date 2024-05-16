import { getPixelAdjustment } from '../../helpers';
import { LineParametersBase } from '../types';
import { DEFAULT_THICKNESS, setLineStyles } from '../util';

interface LineGridParametersSpecific {
  readonly xArray: readonly number[];
  readonly yArray: readonly number[];
  readonly x1: number;
  readonly x2: number;
  readonly y1: number;
  readonly y2: number;
}

export type LineGridParameters = LineGridParametersSpecific &
  LineParametersBase;

export function drawLineGrid(
  c: CanvasRenderingContext2D,
  parameters: LineGridParameters,
): void {
  const { xArray, yArray, x1, x2, y1, y2, thickness } = parameters;

  setLineStyles(c, parameters);

  const adjustment = getPixelAdjustment(thickness ?? DEFAULT_THICKNESS);

  c.beginPath();
  for (const x of xArray) {
    c.moveTo(x + adjustment, y1);
    c.lineTo(x + adjustment, y2);
  }
  for (const y of yArray) {
    c.moveTo(x1, y + adjustment);
    c.lineTo(x2, y + adjustment);
  }
  c.stroke();
}
