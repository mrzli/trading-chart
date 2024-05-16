import { invariant } from '@gmjs/assert';
import { CanvasRenderer } from './canvas-renderer';
import { isolatedRender } from '../helpers';

export interface CanvasRenderingPipeline {
  readonly render: () => void;
}

export interface CanvasRenderingPipelineOptions {
  readonly backgroundColor: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly renderers: readonly CanvasRenderer<any>[];
}

export function createCanvasRenderingPipeline(
  canvas: HTMLCanvasElement,
  options: CanvasRenderingPipelineOptions,
): CanvasRenderingPipeline {
  const { backgroundColor, renderers } = options;

  const c = canvas.getContext('2d');
  invariant(c !== null, 'CanvasRenderingContext2D is null.');

  const render = (): void => {
    if (backgroundColor !== undefined) {
      renderBackground(c, backgroundColor);
    }
    for (const renderer of renderers) {
      renderer.render(c);
    }
  };

  return {
    render,
  };
}

function renderBackground(
  c: CanvasRenderingContext2D,
  backgroundColor: string,
): void {
  isolatedRender(c, (c: CanvasRenderingContext2D) => {
    const width = c.canvas.width;
    const height = c.canvas.height;

    c.clearRect(0, 0, width, height);
    if (backgroundColor !== undefined) {
      c.fillStyle = backgroundColor;
      c.fillRect(0, 0, width, height);
    }
  });
}
