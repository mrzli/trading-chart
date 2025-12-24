import { DrawItemClear } from '../types';

export function drawClear(
  c: CanvasRenderingContext2D,
  item: DrawItemClear,
): void {
  const { area } = item;

  c.clearRect(area.x, area.y, area.width, area.height);
}
