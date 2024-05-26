import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { LineGridParameters, drawLineGrid } from '../../draw';
import { Rect } from '../../types';

export interface GridData {
  readonly xOffsets: readonly number[];
  readonly yOffsets: readonly number[];
}

export function createGridRenderer(area: Rect): CanvasRenderer<GridData> {
  const renderer = (
    c: CanvasRenderingContext2D,
    area: Rect | undefined,
    data: GridData,
  ): void => {
    if (area === undefined) {
      return;
    }

    const { x, y, width, height } = area;

    const lineGridParams: LineGridParameters = {
      xArray: data.xOffsets.map((v) => x + v),
      yArray: data.yOffsets.map((v) => y + v),
      x1: x,
      x2: x + width,
      y1: y,
      y2: y + height,
      thickness: 1,
      color: 'rgba(255, 255, 255, 0.1)',
    };

    drawLineGrid(c, lineGridParams);
  };

  return createCanvasRenderer<GridData>(area, undefined, renderer);
}
