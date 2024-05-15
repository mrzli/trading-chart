export function getPixelAdjustment(thickness: number): number {
  return (Math.floor(thickness) % 2) / 2;
}

export function isolatedRender(
  c: CanvasRenderingContext2D,
  doWork: (c: CanvasRenderingContext2D) => void,
): void {
  c.save();
  doWork(c);
  c.restore();
}
