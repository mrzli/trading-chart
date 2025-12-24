import { DrawItemText } from '../types';

export function drawText(c: CanvasRenderingContext2D, t: DrawItemText): void {
  const { text, x, y, maxWidth } = t;

  c.fillText(text, x, y, maxWidth);
}
