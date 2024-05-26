import { TextParametersStyle, setTextStyle } from '../../draw';

export interface TextMeasurements {
  readonly width: number;
  readonly height: number;
  readonly left: number;
  readonly right: number;
  readonly above: number;
  readonly below: number;
}

export function measureTextCurrentStyle(
  c: CanvasRenderingContext2D,
  text: string,
): TextMeasurements {
  const metrics = c.measureText(text);
  return toTextMeasurements(metrics);
}

export function measureText(
  c: CanvasRenderingContext2D,
  style: TextParametersStyle,
  text: string,
): TextMeasurements {
  c.save();
  setTextStyle(c, style);
  const metrics = c.measureText(text);
  c.restore();

  return toTextMeasurements(metrics);
}

function toTextMeasurements(tm: TextMetrics): TextMeasurements {
  const left = tm.actualBoundingBoxLeft;
  const right = tm.actualBoundingBoxRight;
  const width = tm.width;

  const above = tm.fontBoundingBoxAscent;
  const below = tm.fontBoundingBoxDescent;
  const height = above + below;

  return {
    width,
    height,
    left,
    right,
    above,
    below,
  };
}
