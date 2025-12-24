import { DrawItemBatch } from '../types';
import { drawBatch } from './draw-batch';

export function drawToCanvas(
  canvas: HTMLCanvasElement,
  batch: DrawItemBatch,
): void {
  const c = canvas.getContext('2d')!;

  drawBatch(c, batch);
}
