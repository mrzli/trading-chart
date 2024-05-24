import { Size } from '../../types';

export function measureTextSize(
  c: CanvasRenderingContext2D,
  text: string,
): Size {
  const metrics = c.measureText(text);

  const width = metrics.width;
  const height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

  return {
    width,
    height,
  };
}
