import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { Rect, Size } from '../../types';

export function createCursorRenderer(): CanvasRenderer<undefined> {
  const renderer = (
    _c: CanvasRenderingContext2D,
    _canvasSize: Size,
    _area: Rect | undefined,
    _data: undefined,
  ): void => {
  };

  return createCanvasRenderer<undefined>(undefined, undefined, renderer);
}
