import { FontStyle, Size } from '../types';
import { DEFAULT_FONT_FAMILY, DEFAULT_FONT_SIZE } from '../util';

export function measureText(
  canvas: HTMLCanvasElement,
  font: FontStyle,
  text: string,
): Size {
  const c = canvas.getContext('2d')!;

  c.save();
  const { size, family } = font;
  const fontSize = size ?? DEFAULT_FONT_SIZE;
  const fontFamily = family ?? DEFAULT_FONT_FAMILY;
  c.font = `${fontSize}px ${fontFamily}`;
  const tm = c.measureText(text);
  c.restore();

  const width = tm.width;
  const height = tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent;

  return { width, height };
}
