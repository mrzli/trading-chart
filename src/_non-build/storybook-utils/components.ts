export interface CreateCanvasInput {
  readonly width: number;
  readonly height: number;
  readonly backgroundColor: string;
}

export function createCanvas(
  document: Document,
  input: CreateCanvasInput,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = input.width;
  canvas.height = input.height;
  canvas.style.backgroundColor = input.backgroundColor;

  return canvas;
}
