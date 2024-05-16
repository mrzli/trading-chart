import {
  DEFAULT_COLOR,
  DEFAULT_FONT,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_TEXT_BASELINE,
} from '../util';

export interface TextParameters {
  readonly x: number;
  readonly y: number;
  readonly text: string;
  readonly font?: string;
  readonly color?: string;
  readonly textAlign?: CanvasTextAlign;
  readonly textBaseline?: CanvasTextBaseline;
  readonly maxWidth?: number;
}

export function drawText(
  c: CanvasRenderingContext2D,
  parameters: TextParameters,
): void {
  const { x, y, text, font, color, textAlign, textBaseline, maxWidth } =
    parameters;

  c.font = font ?? DEFAULT_FONT;
  c.fillStyle = color ?? DEFAULT_COLOR;
  c.textAlign = textAlign ?? DEFAULT_TEXT_ALIGN;
  c.textBaseline = textBaseline ?? DEFAULT_TEXT_BASELINE;

  c.fillText(text, x, y, maxWidth);
}
