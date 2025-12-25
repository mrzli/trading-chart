export interface CreateExampleCanvasReturnValue {
  readonly root: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
}

export function createExampleCanvas(
  width: number,
  height: number,
  borderColor: string = '#e5e7eb',
): CreateExampleCanvasReturnValue {
  const root = document.createElement('div');

  const canvas = document.createElement('canvas');
  canvas.style.display = 'block';
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.style.border = `1px solid ${borderColor}`;

  const dpr = globalThis.devicePixelRatio ?? 1;
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));

  root.appendChild(canvas);

  const c = canvas.getContext('2d')!;

  c.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { root, canvas };
}
