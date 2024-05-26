import {
  DEFAULT_COLOR,
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_TEXT_BASELINE,
} from '../util';

export const LIST_OF_FONT_FAMILIES = [
  'sans-serif',
  'Courier New',
  'monospace',
] as const;

export type FontFamily = (typeof LIST_OF_FONT_FAMILIES)[number];

export interface TextParametersStyle {
  readonly fontSize?: number;
  readonly fontFamily?: FontFamily;
  readonly color?: string;
  readonly textAlign?: CanvasTextAlign;
  readonly textBaseline?: CanvasTextBaseline;
}

export interface TextParametersPosition {
  readonly x: number;
  readonly y: number;
}

export interface TextParametersConstraints {
  readonly maxWidth?: number;
}

export interface TextParametersContent {
  readonly text: string;
}

export type TextParameters = TextParametersStyle &
  TextParametersPosition &
  TextParametersConstraints &
  TextParametersContent;

export function drawText(
  c: CanvasRenderingContext2D,
  parameters: TextParameters,
): void {
  const { x, y, text, maxWidth } = parameters;

  setTextStyle(c, parameters);

  c.fillText(text, x, y, maxWidth);
}

export function setTextStyle(
  c: CanvasRenderingContext2D,
  parameters: TextParametersStyle,
): void {
  const { fontSize, fontFamily, color, textAlign, textBaseline } = parameters;

  const finalFontSize = fontSize ?? DEFAULT_FONT_SIZE;
  const finalFontFamily = fontFamily ?? DEFAULT_FONT_FAMILY;

  c.font = `${finalFontSize}px ${finalFontFamily}`;
  c.fillStyle = color ?? DEFAULT_COLOR;
  c.textAlign = textAlign ?? DEFAULT_TEXT_ALIGN;
  c.textBaseline = textBaseline ?? DEFAULT_TEXT_BASELINE;
}
