import { TimeAxisOutputItem } from '../../axis';
import { CanvasRenderer, createCanvasRenderer } from '../../canvas-renderer';
import { TextParameters, drawText } from '../../draw';
import { Rect } from '../../types';

export function createHorizontalAxisRenderer(
  area: Rect,
): CanvasRenderer<readonly TimeAxisOutputItem[]> {
  const renderer = (
    c: CanvasRenderingContext2D,
    area: Rect | undefined,
    data: readonly TimeAxisOutputItem[],
  ): void => {
    if (area === undefined) {
      return;
    }

    const { x, y, width } = area;

    for (const item of data) {
      const { offset, label } = item;

      if (offset < 0 || offset > width) {
        continue;
      }

      const params: TextParameters = {
        x: x + offset,
        y: y + 6,
        text: label,
        textAlign: 'center',
        textBaseline: 'top',
        color: 'white',
        fontSize: 12,
        fontFamily: 'sans-serif',
      };

      drawText(c, params);
    }
  };

  return createCanvasRenderer<readonly TimeAxisOutputItem[]>(
    area,
    undefined,
    renderer,
  );
}
