import { getPixelAdjustment } from '../../helpers';
import { LineParametersBase } from '../types';
import { DEFAULT_THICKNESS, setLineStyles } from '../util';

interface VerticalLinesParametersSpecific {
  readonly xArray: readonly number[];
  readonly y1: number;
  readonly y2: number;
}

export type VerticalLinesParameters = VerticalLinesParametersSpecific &
  LineParametersBase;

export function drawVerticalLines(
  c: CanvasRenderingContext2D,
  parameters: VerticalLinesParameters,
): void {
  const { xArray, y1, y2, thickness } = parameters;

  setLineStyles(c, parameters);

  const adjustment = getPixelAdjustment(thickness ?? DEFAULT_THICKNESS);

  c.beginPath();
  for (const x of xArray) {
    c.moveTo(x + adjustment, y1);
    c.lineTo(x + adjustment, y2);
  }
  c.stroke();
}
