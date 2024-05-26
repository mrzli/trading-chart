export function drawDot(
  c: CanvasRenderingContext2D,
  x: number,
  y: number,
): void {
  c.save();
  c.beginPath();
  c.arc(x, y, 5, 0, 2 * Math.PI);
  c.fillStyle = 'black';
  c.fill();
  c.restore();
}
